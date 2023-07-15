import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  min_value as minValue,
  max_value as maxValue,
  email,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('email', email)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('excluded_country', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabitic characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too hight.`,
          excluded: `you are not allowed to use this value for the field ${ctx.field}`,
          excluded_country: `Due to restrictions, we do not accept users from this location.`,
          passwords_mismatch: `The passwords don't match.`,
          tos: `You must accept terms of service`
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  }
}
