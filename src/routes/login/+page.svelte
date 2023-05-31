<script>
    let formErrors = {};
    let text="";
    import { isLoggedIn } from "../../utils/auth.js";
    import { goto } from '$app/navigation';

    async function signIn() {
    const LoggedIn = await isLoggedIn();
    
      if (LoggedIn) {
        // User is logged in, perform further actions
        console.log("User is logged in.");
        goto('/jobs/new');

      } else {
        // User is not logged in
        console.log("User is not logged in.");
      }
    }
    
</script>

<h1 class="text-center m-3 text-2xl">Login</h1>

{#if text.length > 0}
<p class="text-center" id="welcome-text">Hello {text}</p>
{/if}

<div class="flex justify-center items-center mt-8">
    <form class="w-1/3">
        <div>
        <label class="label" for="username">Username</label>
        <input 
            type="text"
            name="username"
            bind:value={text}
            placeholder="johndoe"
            class="input input-bordered w-full"
        />
        {#if 'username' in formErrors}
                  <label class="label" for="username">
                      <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
                  </label>
        {/if}

        <label class="label" for="username">Password</label>
        <input 
            type="password"
            name="password"
            password=""
            class="input input-bordered w-full"
            required
        />
    </div>        
        <div class="form-control w-full mt-5 p-10">
            <button on:click={signIn} class="bg-emerald-400 p-5 rounded-lg">Login</button> 
        </div>
    </form>
      
</div>