<!-- Homepage -->


<script>
  export let data;

  //add comma to the numbers//
  import humanize from 'humanize-plus';

</script>

  <!-- Browser Tab Title -->
  <svelte:head>
     <title>Home | Next Jobs</title>
  </svelte:head>


<!-- Job List Section -->
<h1 class="text-3xl font-bold underline decoration-sky-500 p-5">Job List</h1>

<div class="overflow-x-auto w-full">
  {#each data.jobs as job}
    <div class="flex flex-col mt-10 card mx-3 shadow-xl bg-white">
      <div class="p-4 bg-sky-100">
        <div class="pb-2">
          <a class="font-bold text-2xl underline decoration-violet-400" href="/jobs/{job.id}">{job.title}</a>
        </div>
        <div class="text-sm mt-1">
          <span class="border-2 border-neutral-300 p-1 rounded-full">{job.employer}</span> 
          <span class="border-2 border-neutral-300 p-1 rounded-full">{job.location}</span> 
          <span class="text-sm border-2 border-neutral-300 p-1 rounded-full">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
        </div>
        <div class="italic text-xs mt-2 text-sm border-2 border-neutral-300 p-1 rounded-full w-52 text-center">posted {new Date(job.created).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</div>
      </div>
      <div class="mt-2 p-4 ">
        About <span class="font-bold underline decoration-pink-400 text-lg">{job.employer}</span>
        <p>{job.description.slice(0, 240)}... <a class="border-2 border-neutral-300 rounded-full px-2 text-center hover:bg-black hover:text-white btn btn-sm" href="/jobs/{job.id}">Details</a></p>
      </div>
    </div>
  {/each}
</div>

