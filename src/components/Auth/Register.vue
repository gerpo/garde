<template>
    <div>
        <div>
            <img
                class="w-auto h-12 mx-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
            />
            <h2
                class="mt-6 text-3xl font-extrabold text-center text-gray-900"
            >Register a new account</h2>
        </div>
        <form class="mt-8 space-y-4" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autocomplete="new-password"
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        required
                        autocomplete="new-password"
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>

            <div>
                <div>
                    <label for="sign-up-code" class="sr-only">Sign Up Code</label>
                    <input
                        id="sign-up-code"
                        name="code"
                        type="text"
                        autocomplete="one-time-code"
                        required
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Code"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    @click="() => true"
                >
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <lock-closed-icon
                            class="w-5 h-5 text-red-500 group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </span>
                    Register
                </button>
            </div>
        </form>
    </div>
</template>