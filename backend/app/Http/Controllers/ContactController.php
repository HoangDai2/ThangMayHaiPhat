<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Traits\CrudTrait;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    use CrudTrait {
        store as traitStore;
    }

    protected function getModelClass(): string
    {
        return Contact::class;
    }

    protected function getValidationRules(Request $request): array
    {
        $isUpdate = $request->isMethod('put') || $request->isMethod('patch');

        return [
            'name' => ($isUpdate ? 'sometimes|' : '') . 'required|string|max:255',
            'phone' => ($isUpdate ? 'sometimes|' : '') . 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'service' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'status' => 'nullable|string|in:new,read'
        ];
    }

    public function store(Request $request)
    {
        try {
            // Execute the standard CrudTrait store method
            $response = $this->traitStore($request);
            
            // If successfully created (status 201), send email
            if ($response->getStatusCode() === 201) {
                $contactData = json_decode($response->getContent(), true);
                $contact = Contact::find($contactData['id']);
                
                if ($contact) {
                    try {
                        // Cấu hình danh sách email nhận thông báo (email của bạn và sếp)
                        $recipients = [
                            'daitmh.tmhp@gmail.com',
                            // 'email_cua_sep@example.com' // Bạn có thể thêm email của sếp vào đây
                        ];
                        
                        // Đưa việc gửi email vào Queue để không làm chậm API phản hồi về Frontend
                        \Illuminate\Support\Facades\Mail::to($recipients)->queue(new \App\Mail\NewContactMail($contact));
                    } catch (\Throwable $e) {
                        \Illuminate\Support\Facades\Log::error('Lỗi gửi email thông báo: ' . $e->getMessage());
                    }
                }
            }
            
            return $response;
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Contact validation failed: ' . json_encode($e->errors()) . ' Payload: ' . json_encode($request->all()));
            throw $e;
        }
    }
}
