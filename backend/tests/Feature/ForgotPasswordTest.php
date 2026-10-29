<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Mail\ResetPasswordMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ForgotPasswordTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_forgot_password_validates_required_and_valid_email()
    {
        // Missing email
        $response = $this->postJson('/api/forgot-password', []);
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);

        // Invalid email format
        $response = $this->postJson('/api/forgot-password', ['email' => 'not-an-email']);
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    public function test_forgot_password_returns_404_when_email_not_found()
    {
        $response = $this->postJson('/api/forgot-password', [
            'email' => 'nonexistent@example.com',
        ]);

        $response->assertStatus(404)
                 ->assertJson([
                     'message' => 'Không tìm thấy tài khoản quản trị nào với email này.'
                 ]);
    }

    public function test_forgot_password_succeeds_and_sends_email_with_secure_token()
    {
        Mail::fake();

        $user = User::factory()->create([
            'email' => 'admin@thangmayhaiphat.com',
            'name' => 'Admin Hai Phat',
            'password' => Hash::make('oldpassword123'),
        ]);

        $response = $this->postJson('/api/forgot-password', [
            'email' => 'admin@thangmayhaiphat.com',
        ], [
            'Origin' => 'http://localhost:3000'
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'mail_sent' => true,
                 ]);

        // Check token record in database
        $record = DB::table('password_reset_tokens')->where('email', $user->email)->first();
        $this->assertNotNull($record);
        $this->assertNotEmpty($record->token);

        // Check email was queued/sent
        Mail::assertSent(ResetPasswordMail::class, function ($mail) use ($user, $record) {
            $this->assertEquals($user->email, $mail->user->email);
            $this->assertStringContainsString('reset-password', $mail->resetUrl);
            $this->assertStringContainsString(urlencode($user->email), $mail->resetUrl);
            // Verify raw token matches hashed token in DB
            $this->assertTrue(Hash::check($mail->token, $record->token));
            return true;
        });
    }

    public function test_repeated_forgot_password_request_updates_token()
    {
        Mail::fake();

        $user = User::factory()->create([
            'email' => 'repeat@thangmayhaiphat.com',
        ]);

        $this->postJson('/api/forgot-password', ['email' => $user->email]);
        $record1 = DB::table('password_reset_tokens')->where('email', $user->email)->first();

        $this->postJson('/api/forgot-password', ['email' => $user->email]);
        $record2 = DB::table('password_reset_tokens')->where('email', $user->email)->first();

        $this->assertNotNull($record2);
        // Tokens should be newly generated and different
        $this->assertNotEquals($record1->token, $record2->token);
    }

    public function test_reset_password_validations()
    {
        // Missing fields
        $response = $this->postJson('/api/reset-password', []);
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email', 'token', 'password']);

        // Password too short (< 6)
        $response = $this->postJson('/api/reset-password', [
            'email' => 'admin@example.com',
            'token' => 'sampletoken',
            'password' => '12345',
            'password_confirmation' => '12345',
        ]);
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['password']);

        // Password confirmation mismatch
        $response = $this->postJson('/api/reset-password', [
            'email' => 'admin@example.com',
            'token' => 'sampletoken',
            'password' => 'secret123',
            'password_confirmation' => 'different123',
        ]);
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['password']);
    }

    public function test_reset_password_fails_with_nonexistent_user()
    {
        $response = $this->postJson('/api/reset-password', [
            'email' => 'ghost@example.com',
            'token' => 'sometoken',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(404)
                 ->assertJson([
                     'message' => 'Tài khoản không tồn tại trong hệ thống.'
                 ]);
    }

    public function test_reset_password_fails_if_no_reset_request_found()
    {
        $user = User::factory()->create([
            'email' => 'user_no_request@example.com',
        ]);

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'token' => 'sometoken',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(400)
                 ->assertJson([
                     'message' => 'Yêu cầu đặt lại mật khẩu không hợp lệ hoặc đã được sử dụng.'
                 ]);
    }

    public function test_reset_password_fails_if_token_is_incorrect()
    {
        $user = User::factory()->create([
            'email' => 'user_wrong_token@example.com',
        ]);

        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => Hash::make('valid-token-123'),
            'created_at' => Carbon::now(),
        ]);

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'token' => 'invalid-token-456',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(400)
                 ->assertJson([
                     'message' => 'Mã xác thực token không chính xác hoặc không hợp lệ.'
                 ]);
    }

    public function test_reset_password_fails_if_token_is_expired()
    {
        $user = User::factory()->create([
            'email' => 'user_expired@example.com',
        ]);

        $rawToken = 'valid-token-123';
        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => Hash::make($rawToken),
            'created_at' => Carbon::now()->subMinutes(61), // Expired > 60 mins
        ]);

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'token' => $rawToken,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(400);
        $this->assertStringContainsString('hết hạn', $response->json('message'));

        // Expired token should be cleared from database
        $this->assertDatabaseMissing('password_reset_tokens', ['email' => $user->email]);
    }

    public function test_reset_password_succeeds_and_allows_login_with_new_password()
    {
        $user = User::factory()->create([
            'email' => 'user_success@example.com',
            'password' => Hash::make('oldpassword123'),
        ]);

        // Create an existing personal access token to verify it gets revoked
        $oldToken = $user->createToken('old-session')->plainTextToken;
        $this->assertCount(1, $user->tokens);

        $rawToken = Str::random(60);
        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => Hash::make($rawToken),
            'created_at' => Carbon::now(),
        ]);

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'token' => $rawToken,
            'password' => 'newsecurepassword456',
            'password_confirmation' => 'newsecurepassword456',
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                 ]);

        // 1. Password in database was updated
        $user->refresh();
        $this->assertTrue(Hash::check('newsecurepassword456', $user->password));
        $this->assertFalse(Hash::check('oldpassword123', $user->password));

        // 2. Token was deleted from password_reset_tokens table
        $this->assertDatabaseMissing('password_reset_tokens', ['email' => $user->email]);

        // 3. Old access tokens were revoked
        $this->assertCount(0, $user->fresh()->tokens);

        // 4. User can successfully log in with the new password
        $loginResponse = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'newsecurepassword456',
        ]);
        $loginResponse->assertStatus(200)
                      ->assertJsonStructure(['token', 'user']);
    }

    public function test_reset_password_handles_uppercase_email_and_whitespace_token()
    {
        $user = User::factory()->create([
            'email' => 'case.sensitive@example.com',
            'password' => Hash::make('original123'),
        ]);

        $rawToken = 'my-token-12345';
        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => Hash::make($rawToken),
            'created_at' => Carbon::now(),
        ]);

        // Submit with uppercase email and leading/trailing whitespace in token
        $response = $this->postJson('/api/reset-password', [
            'email' => 'CASE.SENSITIVE@EXAMPLE.COM',
            'token' => '  ' . $rawToken . '  ',
            'password' => 'brandnewpass789',
            'password_confirmation' => 'brandnewpass789',
        ]);

        $response->assertStatus(200);

        $user->refresh();
        $this->assertTrue(Hash::check('brandnewpass789', $user->password));
    }
}
