<script>
	import '../app.css';
</script>

<div class="flex justify-between">
  <div>
  <a class="text-2xl font-bold m-4 btn bg-white border-none btn-primary hover:bg-emerald-400" href="/">NEXT JOB DB</a>
  </div>
  <div>
  <a href="/jobs/new"><button class="p-4 m-3 btn btn-primary bg-white border-none hover:bg-emerald-400">Post a Job</button></a>
  <button class="p-4  m-3 btn btn-primary bg-white border-none hover:bg-emerald-400"><a href="/login">Sign In</a></button>
  </div>
</div>

<slot />
