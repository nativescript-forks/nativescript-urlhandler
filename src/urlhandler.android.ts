
import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

export function handleIntent(intent: any) {
    let data = intent.getData();
    try {
        let appURL = extractAppURL(data);
        if (appURL != null &&
            (new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_MAIN).valueOf()
                || new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf())) {
            try {
                setTimeout(() => getCallback()(appURL));
            } catch (ignored) {
                application.android.on(application.AndroidApplication.activityResultEvent, (eventData) => {
                    setTimeout(() => getCallback()(appURL));
                });
            }
        }
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }

}
application.android.on(application.AndroidApplication.activityCreatedEvent, (args) => {
    let intent: android.content.Intent = args.activity.getIntent();
    try {
        handleIntent(intent);
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }

});
application.android.on(application.AndroidApplication.activityResumedEvent, (args) => {
    let intent: android.content.Intent = args.activity.getIntent();
    try {
        handleIntent(intent);
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }
});
