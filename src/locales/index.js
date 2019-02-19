import { addLocaleData } from 'react-intl';
import appLocaleDataEN from 'react-intl/locale-data/en';
import appLocaleDataPT from 'react-intl/locale-data/pt';
import ptMessages from './pt-BR';
import enMessages from './en-US';

const AppLocale = {
    en_US: {
        messages: {
            ...enMessages
        },
        locale: 'en-US',
        data: appLocaleDataEN
    },
    pt_BR: { 
        messages: {
            ...ptMessages
        },
        locale: 'pt-BR',
        data: appLocaleDataPT
    }
};

addLocaleData(AppLocale.en_US.data);
addLocaleData(AppLocale.pt_BR.data);

export default AppLocale;
