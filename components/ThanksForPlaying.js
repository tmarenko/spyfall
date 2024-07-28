import BuyMe from "./BuyMe";

const ThanksForPlaying = () => (
	<>
		<div className="card">
			<div className="text">
				Thanks for playing Spyfall!
				<br />
				If you had fun:
			</div>
			<div style={{ width: "148px", margin: "0 auto" }}>
				<BuyMe />
			</div>
		</div>
		<style jsx>{`
			.card {
				margin: 2em auto 0;
				border: 2px solid #ddd;
				padding: 1em;
				max-width: 18em;
				font-size: 0.9em;
			}
			.text {
				font-size: 0.9em;
			}
			button {
				margin: 0.8em 0 1.1em;
			}
		`}</style>
	</>
);

export default ThanksForPlaying;
