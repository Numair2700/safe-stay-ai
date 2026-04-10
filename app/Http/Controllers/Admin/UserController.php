<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(public UserService $userService) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => $this->userService->getAllUsers(),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        // Prevent admin from changing their own role
        if ($user->id === auth()->id()) {
            return redirect()->back()
                ->withErrors(['user' => 'You cannot change your own role.']);
        }

        $this->userService->updateRole($user, $request->validated('role'));

        return redirect()->route('admin.users.index')
            ->with('success', 'User role updated successfully.');
    }
}
