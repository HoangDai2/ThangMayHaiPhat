<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Traits\CrudTrait;

class UserController extends Controller
{
    use CrudTrait {
        index as traitIndex;
        store as traitStore;
        update as traitUpdate;
    }

    protected function getModelClass(): string
    {
        return User::class;
    }

    public function index(Request $request)
    {
        // Load relationships to show roles and permissions
        $users = User::with(['roles', 'permissions'])->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $data = $request->all();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        // Assign Employee Role if necessary (optional, but good practice)
        // $employeeRole = Role::firstOrCreate(['name' => 'Employee']);
        // $user->roles()->syncWithoutDetaching([$employeeRole->id]);

        if ($request->has('permissions')) {
            $user->permissions()->sync($request->permissions);
        }

        $this->incrementCacheVersion();

        return response()->json($user->load('permissions'), 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,'.$id,
            'password' => 'nullable|string|min:6',
        ]);

        $data = $request->all();
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        if ($request->has('permissions')) {
            $user->permissions()->sync($request->permissions);
        }

        $this->incrementCacheVersion();

        return response()->json($user->load('permissions'));
    }
}

