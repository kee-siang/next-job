<!-- Job Details Page -->

<script>
 import SvelteMarkdown from 'svelte-markdown';
 import humanize from "humanize-plus";
 export let data;
 import { getUserId, isAuthenticated } from './../../../utils/auth.js'
</script>

<svelte:head>
  <title>Job Details | Next Jobs</title>
</svelte:head>

<div>
    <div class="flex">
        <div class="flex-1">
            <h1 class="text-3xl font-bold underline decoration-sky-500 py-4 mb-8">Job Details</h1>
            <div class="flex justify-between">
            <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
            <!-- Show edit button for user that has log in -->
            {#if $isAuthenticated == true && data.job.user == getUserId()}
                <button class="text-center hover:bg-black hover:text-white btn btn-primary bg-white text-black border-none w-32"><a href="{data.job.id}/update">EDIT</a></button>
            {/if}
            </div>
            <p class="text-xl py-4 underline decoration-pink-400">{data.job.employer}</p>
            <span class="rounded-lg bg-red-300 border-none m-4 p-1">{data.job.location}</span>
            <span class="rounded-lg bg-cyan-500 border-none m-4 p-1">USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD
                {humanize.formatNumber( data.job.maxAnnualCompensation )}</span>
        </div>
    </div>
</div>



<div class="flex flex-row w-full mt-8">
    <div class="basis-2/3 prose  max-w-none w-full">
        <h2 class="text-xl font-thin underline decoration-amber-400">Description</h2>
        <div>
            <SvelteMarkdown source={data.job.description} />
        </div>
        <div class="mt-6" />
        <h2 class="text-xl font-thin underline decoration-amber-400">Requirements</h2>
        <div>
            <SvelteMarkdown source={data.job.requirements} />
            <div/>
            <div class = "mt-6" />
            <h2 class="text-xl font-thin underline decoration-amber-400">How to Apply?</h2>
            <p>{data.job.applicationInstructions}</p>
        </div>
        <div class="basis-1/3 ml-4">
            <h2 class="text-xl font-thin underline decoration-amber-400">Location</h2>
            <p>{data.job.location}</p>
            <div class="mt-6" />
            <h2 class="text-xl font-thin underline decoration-amber-400">Salary Range</h2>
            <p>
                USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD
                {humanize.formatNumber( data.job.maxAnnualCompensation )}
            </p>
        </div>
    </div>
</div>
