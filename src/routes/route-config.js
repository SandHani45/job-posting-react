import WorkCell from './../pages/work-cell/work-cell';
import PanelShop from './../pages/panel-shop/panel-shop';
import JobPosting from './../pages/job-posting/job-posting';
import LaborActivity from './../pages/labor-activity/labor-activity';
import LaborConfirm from './../pages/labor-confirm/labor-confirm';
import ProgressTimers from './../pages/progress-timers/progress-timers';
import ReviewTimer from './../pages/review-timer/review-timer';
import ProgressTimeStop from './../pages/progress-time-stop/progress-time-stop';
import LaborRecordComplete from './../pages/labor-record-complete/labor-record-complete'
import LaborReviewAndPosting from './../pages/labor-review-and-posting/labor-review-and-posting';
import LaborReviewAndPostingEdit from  './../pages/labor-review-and-posting/labor-review-and-posting-edit'
import LaborReviewAndPostingView from './../pages/labor-review-and-posting/labor-review-and-posting-view'
import LaborReviewAndPostingAdd from './../pages/labor-review-and-posting/labor-review-and-posting-add'
import LaborTracker from './../pages/labor-tracker/labor-tracker'
export const Routes = [
    {
        component: WorkCell,
        path: '/work-cell',
        exact: true,
        title: 'Work Cell'
    },
    {
        component: PanelShop,
        path: '/panel-shop/:id',
        isBreadcrumbVisible: true,
        exact: true,
        title: 'PanelShop'
    },
    {
        component: JobPosting,
        path: '/job-posting-employee/:id',
        exact: true,
        title: 'JobPosting'
    },
    {
        component: LaborActivity,
        path: '/labor-activity/:id',
        exact: true,
        title: 'LaborActivity'
    },
    {
        component: LaborConfirm,
        path: '/labor-confirm',
        exact: true,
        title: 'labor-confirm'
    },
    {
        component: ProgressTimers,
        path: '/progress-timers',
        exact: true,
        title: 'ProgressTimers'
    },
    {
        component: ReviewTimer,
        path: '/review-timer',
        exact: true,
        title: 'ReviewTimer'
    },
    {
        component: ProgressTimeStop,
        path: '/progress-time-stop/:id',
        exact: true,
        title: 'ProgressTimeStop'
    },
    {
        component: LaborRecordComplete,
        path: '/labor-record-complete/:id',
        exact: true,
        title: 'LaborRecordComplete'
    },
    {
        component: LaborReviewAndPosting,
        path: '/labor-review-and-posting',
        exact: true,
        title: 'LaborReviewAndPosting'
    },
    {
        component: LaborReviewAndPostingEdit,
        path: '/labor-review-and-posting/edit/:id',
        exact: true,
        title: 'LaborReviewAndPostingEdit'
    },
    {
        component: LaborReviewAndPostingView,
        path: '/labor-review-and-posting/:id',
        exact: true,
        title: 'LaborReviewAndPosting'
    },
    {
        component: LaborReviewAndPostingAdd,
        path: '/labor-review-and-posting-add-labor-record',
        exact: true,
        title: 'LaborReviewAndPostingAdd'
    },
    {
        component: LaborTracker,
        path: '/labor-tracker',
        exact: true,
        title: 'LaborTracker'
    }
];
