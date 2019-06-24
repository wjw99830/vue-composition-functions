# vue-composition-functions
Support function-api in Vue 3.0.

# Supported
+ value
+ computed
+ watch
+ all lifycycles in 2.x like onMounted

# Unsupported
+ inject
+ provide
+ onUnmounted
+ type inference for props

# Drawback
+ watch: Same as Vue.prototype.$watch. Don't support new watch options and multiple sources.
+ computed: Don't support setter.
+ lyfecycles: Don't support multiple handlers in a single call.
