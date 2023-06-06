<!-- Create new user page -->

<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { goto } from '$app/navigation';
  import { authenticateUser } from './../../../utils/auth.js';
  import { isAuthenticated } from './../../../utils/auth.js';
	import { writable } from 'svelte/store';
  let isLoading = writable(false);
  let formErrors = {};


  async function postSignUp() {
      goto('/jobs/new');
    }

  async function createUser(evt) {
    //prevent the page go to the top when button is clicked//
    evt.preventDefault();

    isLoading.set(true);

    if (evt.target['password'].value != evt.target['password-confirmation'].value) 
    {
      formErrors['password'] = { message: 'Password confirmation does not match' };
      return;
    }

    const userData = {
      username: evt.target['username'].value,
      email: evt.target['email'].value,
      password: evt.target['password'].value,
      passwordConfirm: evt.target['password-confirmation'].value
    };

    //create and insert the new user data into database//
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + 'api/collections/users/records', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (resp.status == 200) {
      const res = await authenticateUser(userData.username, userData.password);

      if (res.success) {
        postSignUp();
        isAuthenticated.set(true);
      } else {
        throw 'Sign up succeeded but authentication failed';
      }
    } else {
      const res = await resp.json();
      formErrors = res.data;
    }
    isLoading.set(false);
  }
</script>

<svelte:head>
  <title>Create User | Next Jobs</title>
</svelte:head>

<!-- If isAuthenticated is false, show this warning message -->
{#if $isAuthenticated == false}
<div class="alert alert-warning flex p-4 rounded-lg">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Please sign up first before proceed to post new job page</span>
</div>
{/if}

<h1 class="text-center text-xl mt-4">Create an Account to Post a Job</h1>
<div class="text-center">
    <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
</div>
<div class="flex justify-center items-center mt-8">
    <form on:submit={createUser} class="w-1/3">
      <!-- Username input section -->
        <div class="form-control w-full">
            <label class="label" for="username">
                <span class="label-text">Username</span>
            </label>
            <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
            {#if 'username' in formErrors}
            <label class="label" for="username Error">
                <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
            </label>
            {/if}
        </div>
      <!-- Email input section -->
        <div class="form-control w-full">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required/>
            {#if 'email' in formErrors}
            <label class="label" for="Email Error">
                <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
            </label>
            {/if}
        </div>

      <!-- Password input section -->
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
            {#if 'password' in formErrors}
            <label class="label" for="password">
                <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
            </label>
            {/if}
        </div>

      <!-- Confirm password input section -->
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Confirm Password</span>
            </label>
            <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
            {#if 'password' in formErrors}
            <label class="label" for="password">
                <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
            </label>
            {/if}
        </div>

      <!-- Create User Button -->
        <div class="mt-5 flex justify-center">
          <button class="bg-white hover:bg-black hover:text-white w-48 flex justify-around rounded-lg my-8 py-4 border flex justify-center">
          <div class="flex justify-around">
              <div>CREATE USER</div>
              <!-- If the isLoading store is true, show the spinner animation -->
              {#if $isLoading}
                <div class="pl-3">
                <span class="loading loading-spinner loading-md"></span>
                </div>
              {/if}
          </div>
          </button>
      </div>
    </form>
</div>


    