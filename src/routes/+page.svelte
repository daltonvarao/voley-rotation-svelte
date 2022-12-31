<script>
	import ControlPanel from '@components/ControlPanel.svelte';
	import Court from '@components/Court.svelte';
	import Footer from '@components/Footer.svelte';
	import Header from '@components/Header.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		document.body.ondragover = function (ev) {
			ev.preventDefault();
		};
	});
</script>

<div id="app">
	<Header />
	<ControlPanel />
	<Court />
	<Footer />
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
