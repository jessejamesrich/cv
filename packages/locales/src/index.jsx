/** @format */
import i18n from "i18next";
import { PureComponent, createContext, useContext } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import config from "./config/index.json";

import TestContext from "./.tests/context.jsx";

import Menu from "./components/Menu";

const LocalesContext = createContext({});

class Locales extends PureComponent {
	constructor(props) {
		super(props);
		this.supported = [];
		this.state = { ready: false, locale: "en-us" }; // set a cookie here if you wanna
	}

	setup = async () => {
		try {
			const enabledLanguages = config.supported.filter((lang) => lang.enabled);

			const files = await Promise.all(
				enabledLanguages.map(async (lang) => {
					const { code } = lang;
					const content = await import(`./config/${code}.json`);
					return { [code]: { translation: content.default } };
				})
			);

			// Transform the array into an object for i18next
			const resources = Object.assign({}, ...files);

			this.supported = enabledLanguages.map((lang) => lang.code); // Only store the codes

			if (!this.state.ready) {
				i18n
					.use(initReactI18next)
					.init({
						fallbackLng: config.default,
						lng: this.state.locale,
						debug: false,
						lowerCaseLng: true,
						resources,
					})
					.then(() => {
						i18n.languages = Object.keys(this.supported);
						this.t = i18n.t;
						this.setState({ ready: true, locale: this.state.locale });
					});
			}
		} catch (error) {
			throw new Error("Error loading locales.");
		}
	};

	setLocale = (locale) => {
		return new Promise((resolve, reject) => {
			try {
				if (this.supported.includes(locale)) {
					// set a cookie here if you wanna
					this.setState({ locale }, () => {
						i18n.changeLanguage(locale);
						resolve(true);
					});
				} else {
					resolve(false); // Locale not supported
				}
			} catch (e) {
				// A nice little error handle/snackbard if what I normally use on errors
				reject(e);
			}
		});
	};

	getLocale = (locale) => {
		return locale ? this.state.locale == locale : this.state.locale || config.default;
	};

	getLocales = () => {
		return this.supported.map((locale) => ({ ...locale, selected: locale.code == this.state.locale }));
	};

	componentDidMount() {
		this.setup();
	}

	componentWillUnmount() {
		// wanna tear down localization?
	}

	render() {
		return (
			<I18nextProvider i18n={i18n}>
				<LocalesContext.Provider
					value={{
						...this.state,
						t: this.t,
						get: this.getLocale,
						set: this.setLocale,
						enabled: this.getLocales,
					}}
				>
					{this.state.ready && this.props.children}
				</LocalesContext.Provider>
			</I18nextProvider>
		);
	}
}

const withLocales = (Component) => (props) => {
	return (
		<LocalesContext.Consumer>
			{(state) => <Component {...props} locales={state} t={state.t} />}
		</LocalesContext.Consumer>
	);
};

const useLocales = () => {
	return useContext(LocalesContext);
};

export default Locales;
export { Menu, TestContext, useLocales, withLocales };
