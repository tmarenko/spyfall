import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Page from "../components/Page";

import { withTranslation } from "../i18n";

const Join = ({ t }) => {
	const router = useRouter();
	const invalidCode = router.query.invalid;

	const [gameCode, setGameCode] = useState("");
	return (
		<Page>
			<div className="main-menu">
				<h4>{t("ui.welcome to spyfall")}</h4>

				<hr />

				<form id="join-game">
					{invalidCode && <p>Game code {invalidCode} is invalid!</p>}
					<div>
						<input
							autocorrect="off"
							autocapitalize="off"
							type="text"
							id="access-code"
							name="accessCode"
							placeholder={t("ui.enter an access code")}
							onChange={({ target: { value } }) => setGameCode(value)}
						/>

						<div className="button-container">
							<Link href={"/" + gameCode}>
								<button>{t("ui.join")}</button>
							</Link>
							<Link href="/">
								<button>{t("ui.back")}</button>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</Page>
	);
};

export default withTranslation("common")(Join);
