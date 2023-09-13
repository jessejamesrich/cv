/** @format */
import { useLocales } from "locales";

export default function () {
	const { t } = useLocales();
	return <>{t("placeholder")}</>;
}
