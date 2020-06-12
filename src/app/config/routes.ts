export class AppRoutes {

    /**
     * Home route
     */
    public static readonly APP_HOME_PAGE = 'application/recharge/home';

    /**
     * Security routes
     */
    public static readonly APP_LOGIN = 'login';
    public static readonly APP_REGISTER = 'register';
    public static readonly APP_RECOVERY = 'recovery';
    public static readonly APP_OTP = 'otp';

    /**
     * SendShoppingResponse routes
     */
    public static readonly APP_CUBACEL_RECHARGE = 'application/recharge/cubacel';
    public static readonly APP_NAUTA_RECHARGE = 'application/recharge/nauta';
    public static readonly APP_LONG_DISTANCE_RECHARGE = 'application/recharge/long-distance';

    /**
     * Other routes
     */
    public static readonly APP_SETTINGS = 'settings';
    public static readonly APP_SHOPPING_CART = 'shopping';
    public static readonly APP_STRIPE = 'stripe';
    public static readonly APP_SUCCESS = 'result/success';
    public static readonly APP_ERROR = 'result/error';
    public static readonly APP_ERROR_DUPLICATED = 'result/error-duplicated';
    public static readonly APP_CREDIT_CARD_DETAIL = 'credit-cards';

    /**
     * Transfer routes
     */
    public static readonly APP_TRANSFER_CREATE = 'transfer-create';
    public static readonly APP_TRANSFER_LIST = 'transfer-list';

    /**
     * Agents routes
     */
    public static readonly APP_AGENTS_LIST = 'agent/list';
    public static readonly APP_AGENTS_SHOW = 'agent/show/:id';
    public static readonly APP_AGENTS_EDIT = 'agent/edit/:id';
    public static readonly APP_AGENTS_CREATE = 'agent/create';

    /**
     * Profile routes
     */
    public static readonly APP_EDIT_PROFILE = 'edit-profile';
    public static readonly APP_EDIT_PASSWORD = 'change-password';
    public static readonly APP_EDIT_SALES = 'edit-sales';

    /**
     * Recharges routes
     */
    public static readonly APP_RECHARGE_HISTORY = 'list';
    public static readonly APP_RECHARGE_DETAIL = 'show/:id';


}
