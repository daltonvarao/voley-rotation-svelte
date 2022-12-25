<script>
	import { onMount } from 'svelte';
	import Court from '../components/Court.svelte';

	onMount(() => {
		document.body.ondragover = function (ev) {
			ev.preventDefault();
		};
	});
</script>

<div id="app">
	<Court />
</div>

<style>
	#app {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #35a9df;
		flex-direction: column;
	}
</style>
