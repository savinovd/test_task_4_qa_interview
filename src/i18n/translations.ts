import type { Locale } from './types';

type Dict = Record<string, string>;

// Deliberately incomplete and uneven. Every "gap" or quirk below is an
// intentional bug — see docs/task-5-localization.md for the catalogue.

export const translations: Record<Locale, Dict> = {
  'en-US': {
    'task5.title': 'Localization',
    'task5.heading': 'Welcome aboard',
    'task5.subtitle': '3-step onboarding to personalise your account.',

    'common.continue': 'Continue',

    'step1.eyebrow': 'Step 1 of 3',
    'step1.heading': 'Tell us about yourself',
    'step1.field.age': 'Age',
    'step1.field.age.placeholder': 'e.g. 29',
    'step1.field.gender': 'Gender',
    'step1.gender.male': 'Male',
    'step1.gender.female': 'Female',
    'step1.gender.other': 'Other',
    'step1.field.name': 'Your name',
    'step1.field.name.placeholder': 'e.g. Alex',
    'step1.cta': 'Continue',
    'step1.trust': 'Trusted by 10,000+ users worldwide',

    'paywall.eyebrow': 'Step 2 of 3',
    'paywall.heading': 'Choose your plan',
    'paywall.trial': 'Trial ends in {days} {dayWord} ({date}).',
    'paywall.plan.basic.name': 'Basic',
    'paywall.plan.basic.desc': 'Everything you need to get started.',
    'paywall.plan.pro.name': 'Pro',
    'paywall.plan.pro.desc': 'For power users who want it all.',
    'paywall.price.month': '{price} / month',
    'paywall.cta': 'Continue to checkout',

    'success.eyebrow': 'Step 3 of 3',
    'success.heading': 'Welcome, {name}!',
    'success.body': 'You are on the {plan} plan. Your trial ends on {date}.',
    'success.field.age': 'Age',
    'success.field.gender': 'Gender',
    'success.field.plan': 'Plan',
    'success.cta': 'Start over',
  },

  'es-MX': {
    'task5.title': 'Localización',
    'task5.heading': '¡Bienvenido a bordo!',
    'task5.subtitle': 'Onboarding de 3 pasos para personalizar tu cuenta.',

    'common.continue': 'Continuar',

    'step1.eyebrow': 'Paso 1 de 3',
    'step1.heading': 'Cuéntanos sobre ti',
    'step1.field.age': 'Edad',
    'step1.field.age.placeholder': 'p. ej. 29',
    'step1.field.gender': 'Género',
    'step1.gender.male': 'Hombre',
    'step1.gender.female': 'Mujer',
    // BUG: 'step1.gender.other' is missing on purpose. UI shows the raw key.
    'step1.field.name': 'Tu nombre',
    'step1.field.name.placeholder': 'p. ej. Alex',
    'step1.cta': 'Continuar',
    'step1.trust': 'Más de 10,000 usuarios en todo el mundo confían en nosotros',

    'paywall.eyebrow': 'Paso 2 de 3',
    'paywall.heading': 'Elige tu plan',
    'paywall.trial': 'El periodo de prueba termina en {days} {dayWord} ({date}).',
    'paywall.plan.basic.name': 'Básico',
    'paywall.plan.basic.desc': 'Todo lo que necesitas para empezar.',
    'paywall.plan.pro.name': 'Pro',
    'paywall.plan.pro.desc': 'Para usuarios avanzados que lo quieren todo.',
    'paywall.price.month': '{price} / mes',
    // BUG: deliberately long string to expose CTA button layout under
    // long text (nowrap + ellipsis on the button).
    'paywall.cta': 'Continuar al proceso de pago seguro y aceptar los términos del servicio',

    'success.eyebrow': 'Paso 3 de 3',
    // BUG: placeholder mismatch — translator used {nombre}, but the
    // codebase passes {name}, so the literal "{nombre}" stays in the UI.
    'success.heading': '¡Bienvenido, {nombre}!',
    'success.body': 'Estás en el plan {plan}. Tu prueba termina el {date}.',
    'success.field.age': 'Edad',
    // BUG: missing diacritic — should be "Género". Tests "?" / mojibake
    // perception when special characters are dropped.
    'success.field.gender': 'Genero',
    'success.field.plan': 'Plan',
    'success.cta': 'Comenzar de nuevo',
  },

  'uk-UA': {
    'task5.title': 'Локалізація',
    'task5.heading': 'Ласкаво просимо',
    'task5.subtitle': 'Онбординг із 3 кроків для персоналізації акаунта.',

    'common.continue': 'Далі',

    'step1.eyebrow': 'Крок 1 із 3',
    'step1.heading': 'Розкажіть про себе',
    'step1.field.age': 'Вік',
    'step1.field.age.placeholder': 'напр. 29',
    'step1.field.gender': 'Стать',
    'step1.gender.male': 'Чоловіча',
    'step1.gender.female': 'Жіноча',
    'step1.gender.other': 'Інше',
    'step1.field.name': "Ваше ім'я",
    // BUG: 'step1.field.name.placeholder' missing in uk-UA → the input's
    // placeholder attribute renders as the raw key string.
    'step1.cta': 'Далі',
    // BUG: deliberately straight ASCII apostrophe in "10 000+" + uses
    // a non-Ukrainian convention "10,000+". A real Ukrainian translator
    // would write "Понад 10 000 користувачів довіряють нам у всьому світі".
    'step1.trust': 'Понад 10,000 користувачів довіряють нам у світі',

    'paywall.eyebrow': 'Крок 2 із 3',
    'paywall.heading': 'Оберіть тарифний план',
    'paywall.trial': 'Пробний період закінчується через {days} {dayWord} ({date}).',
    'paywall.plan.basic.name': 'Базовий',
    'paywall.plan.basic.desc': 'Усе необхідне для старту.',
    'paywall.plan.pro.name': 'Про',
    'paywall.plan.pro.desc': 'Для досвідчених користувачів.',
    'paywall.price.month': '{price} / місяць',
    'paywall.cta': 'Перейти до оплати',

    'success.eyebrow': 'Крок 3 із 3',
    'success.heading': 'Вітаємо, {name}!',
    'success.body': 'Ви на плані {plan}. Пробний період закінчується {date}.',
    'success.field.age': 'Вік',
    'success.field.gender': 'Стать',
    'success.field.plan': 'План',
    'success.cta': 'Почати спочатку',
  },
};
