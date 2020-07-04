'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.post('/meraki/updateTags/', 'MerakiController.updateTags').as('meraki.update')

Route.get('/', 'AccountController.index').as('welcomePage')
Route.get('/plans/org', 'AccountController.orgPlanPage')
Route.get('/email/to/:user/:week', 'api/report/GenerateController.sendReportToUser')
Route.get('/email/:user/:week', 'api/report/GenerateController.testReport')
Route.get('/email/welcome/partner', 'api/report/GenerateController.welcomePartnerEmail')

Route.get('/admin/daily/:date', 'api/report/GenerateController.fullReportDaily')

Route.get('/login', 'Auth/AuthController.showLogin').as('loginPage')
Route.post('/login', 'Auth/AuthController.postLogin').as('login.store')
Route.post('/api/login', 'Auth/AuthController.apiLogin').as('login.store')
Route.post('/api/login/droid', 'Auth/AuthController.guardDroidLogin').as('login.store')

Route.get('/logout', 'Auth/AuthController.logout').as('logout')
Route.get('/partner/register/:token/:email', 'Auth/AuthController.showRegisterPartner')

Route.get('/register', 'Auth/AuthController.showRegister').as('registerPage')
Route.post('/register/partner', 'Auth/AuthController.postPartner').as('register.storePartner')
Route.post('/register', 'Auth/AuthController.postRegister').as('register.store')

Route.get('/password/reset', 'Auth/PasswordController.showResetForm').as('reset.form')
Route.post('/password/email', 'Auth/PasswordController.sendResetLinkEmail').as('send.reset.email')
Route.get('/testemail', 'Auth/PasswordController.sendWeeklyUserReport')
Route.get('/password/token/reset/:token', 'Auth/PasswordController.showResetView')
Route.post('/password/reset', 'Auth/PasswordController.reset').as('reset.password')

Route.get('/contact', 'ContactController.index').as('contact.show').as('contact.show')
Route.post('/contact', 'ContactController.sendMessage').as('contact.send')

Route.get('/404', 'AdminController.show404')
Route.get('/500', 'AdminController.show500')

/** '
 * Social Login Route
 */
Route.get('/auth/:provider', 'Auth/AuthController.redirectToProvider').as('social.login')
Route.get('/auth/:provider/callback', 'Auth/AuthController.handleProviderCallback').as('social.login.callback')

Route.group(() => {
  Route.get('/account', 'AccountController.edit').as('user.account')
  Route.post('/account/profile', 'AccountController.update').as('account.update')
  Route.post('/account/photo', 'AccountController.uploadAvatar').as('account.updateAvatar')
  Route.post('/account/password', 'AccountController.changePassword').as('account.updatePwd')
  Route.get('/account/unlink/:provider', 'AccountController.unlinkSocialMediaAccount').as('unlink.sm')
  Route.get('/account/delete', 'AccountController.destroy').as('account.delete')

// Payment routes
  Route.get('/api/stripe', 'StripeController.index').as('api.stripe')
  Route.post('/subscribe/yearly', 'StripeController.postStripeYearly').as('api.stripe.postYear')
  Route.post('/subscribe/monthly', 'StripeController.postStripeMonthly').as('api.stripe.postMonth')
  Route.post('/subscribe/monthly/small', 'StripeController.postStripeMonthlySmall').as('api.stripe.postMonth')

})

Route.get('/report/:user/:week', 'ReportController.reportsJSON')

Route.get('/report/full/weekly/:user/:week', 'ReportController.weeklyUserReport')
Route.get('/report/tophits/full/:user/:week', 'ReportController.fullTopHits')
Route.get('/report/searches/explicit/:user/:week', 'ReportController.explicitSearches')
Route.get('/report/blocks/explicit/:user/:week', 'ReportController.blockedSites')

// Route.get('/account/add, AccountController.addPartner').middleware(['auth'])

Route.get('/api', async ({ view }) => view.render('api')).middleware(['auth'])

Route.get('/test', async ({ view }) => view.render('email.request.link'))

Route.get('/report', 'ReportController.index').as('reports.index').middleware(['auth'])

Route.get('/device', 'DeviceController.index').middleware(['auth'])
Route.get('/device/remove/:id', 'DeviceController.remove')
Route.get('/device/searches/:user/:severity', 'DeviceController.searches').as('reports.index').middleware(['auth'])

Route.get('/report/:start/:end/:user/:limit', 'api/ReportController.renderEmailTemplate')
Route.get('/device/report/:user', 'api/ReportController.index').middleware(['auth'])
// Route.get('/device/report', 'api/ReportController.index').middleware(['auth'])

Route.get('/restrictions', 'AccountController.showDashboard').middleware(['auth'])
Route.post('/restrictions', 'MerakiController.list')

Route.get('/privacy', 'AccountController.showPrivacyPage')

Route.post('/account/request/partner', 'RequestController.request').as('requestPartner')

// Route.post('/request/partner/', 'RequestController.request').as('partner.render')
Route.get('/request/partner/', 'RequestController.createRelationship').as('partner.create')
Route.get('/partner/add/:token', 'RequestController.createRelationshipExisting')

Route.get('/subscribe', 'AccountController.initialLogin')

Route.get('/dashboard/', 'AccountController.showDashboard').as('Dashboard.show')
Route.post('/device/list', 'AccountController.listDevices')

Route.post('/contact/feedback', 'FeedbackController.contactFormPost').as('contactFormPost')
Route.get('/admin/users', 'AdminController.listUsers')
Route.post('admin/users/edit', 'AdminController.updateDevice').as('admin.updateDevice')
Route.post('admin/users/add', 'AdminController.addDevice').as('admin.addDevice')

// Route.get('/proposal', 'FeedbackController.sendProposal')

Route.get('/token', 'Auth/PasswordController.showCsrf')
Route.get('/admin/users/reports', 'AdminController.userReports')
Route.get('/404', 'FourOhFourController.show')

Route.get('/device/setup/:device_type', 'AccountController.showDeviceSetup')
Route.get('/device/restrictions', 'AccountController.showDeviceRestrictions').middleware(['auth'])

Route.get('/clear/session', 'AccountController.clearSession')

Route.get('/email/newuser', 'AccountController.emailNewUser')
Route.post('/restrictions/toggleACL', 'MerakiController.toggleACL')

Route.get('/gf/config', 'GuardRailsConfig/AclController.list')
Route.post('/gf/config', 'GuardRailsConfig/AclController.edit').as('gf.config.edit')

Route.post('/gf/blockpage/feedback', 'api/ReportController.blockPageFeedback')
