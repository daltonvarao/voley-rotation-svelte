<script>
	// @ts-nocheck

	import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte';
	import IoLogoInstagram from 'svelte-icons/io/IoLogoInstagram.svelte';
	import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte';
	import IoLogoTwitter from 'svelte-icons/io/IoLogoTwitter.svelte';
</script>

<div id="footer">
	<span>Made with ❤️ by Dalton Varão</span>
	<div id="social-icons">
		<a href="https://www.instagram.com/daltonvarao">
			<div class="icon">
				<IoLogoInstagram />
			</div>
		</a>

		<a href="https://www.linkedin.com/in/daltonvarao">
			<div class="icon">
				<IoLogoLinkedin />
			</div>
		</a>

		<a href="https://www.github.com/daltonvarao">
			<div class="icon">
				<IoLogoGithub />
			</div>
		</a>

		<a href="https://www.twitter.com/daltonvarao">
			<div class="icon">
				<IoLogoTwitter />
			</div>
		</a>
	</div>
</div>

<style>
	#footer {
		margin-top: 3rem;
		color: white;
	}

	.icon {
		width: 32px;
		color: white;
	}

	#social-icons {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}
</style>
