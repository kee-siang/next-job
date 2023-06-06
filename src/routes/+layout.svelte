<!-- header -->

<script>
	import '../app.css';
  import { isAuthenticated, logOut } from '../utils/auth.js';
  import { goto } from '$app/navigation';

  function loginStatus () {
      if (!$isAuthenticated) {
          goto("/users/new");
      } else {
          goto("/jobs/new");
        }
  }
</script>

<nav class="flex justify-between bg-cover bg-no-repeat" style="background-image: url(https://142915.fs1.hubspotusercontent-na1.net/hub/142915/hubfs/ROI%20-%20Email%20segmentation.jpg?width=1770&name=ROI%20-%20Email%20segmentation.jpg); background-size: 100% auto; width: 100%; height: 300px;" >
  <div>
    <a class="text-2xl font-bold m-4 border-none btn btn-active hover:bg-white hover:text-black btn-ghost text-white" href="/">Find Job.com</a>
  </div>
  <div>
    <button on:click={loginStatus} id="btn" class="p-4 m-3 btn btn-active border-none hover:bg-white hover:text-black btn-ghost text-white">Post a Job</button>
    {#if $isAuthenticated}
    <button on:click={logOut} class="p-4 m-3 btn btn-active border-none btn-ghost hover:bg-white hover:text-black text-white">Sign Out</button>
    {:else}
    <button class="p-4 m-3 btn btn-active border-none hover:bg-white hover:text-black btn-ghost text-white"><a href="/login">Sign In</a></button>
    {/if}
  </div>
</nav>

<slot />
