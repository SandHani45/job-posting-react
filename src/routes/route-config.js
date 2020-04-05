import WorkCell from './../pages/work-cell/work-cell';
import PanelShop from './../pages/panel-shop/panel-shop';
import JobPosting from './../pages/job-posting/job-posting';
import LaborActivity from './../pages/labor-activity/labor-activity';
import LaborConfirm from './../pages/labor-confirm/labor-confirm';
import ProgressTimers from './../pages/progress-timers/progress-timers';
import ReviewTimer from './../pages/review-timer/review-timer'
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
        path: '/labor-confirm/',
        exact: true,
        title: 'labor-confirm'
    },
    {
        component: ProgressTimers,
        path: '/progress-timers/',
        exact: true,
        title: 'ProgressTimers'
    },
    {
        component: ReviewTimer,
        path: '/review-timer/',
        exact: true,
        title: 'ReviewTimer'
    },
    
];
