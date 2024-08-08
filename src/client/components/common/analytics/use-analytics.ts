import { useEffect, useCallback } from "react";
import isEmpty from "lodash/isEmpty";
import mixpanel from "mixpanel-browser";

/**
 * Tracks an event with the given name and properties using Mixpanel.
 *
 * @param {string} eventName - The name of the event to track.
 * @param {any} properties - The properties associated with the event.
 */
const trackEvent = (eventName: string, properties: any) => {
  if (mixpanel) {
    mixpanel.track(eventName, properties);
  }
};

/**
 * A React hook that sets up Mixpanel analytics and tracks click events.
 *
 * @returns {null} This hook does not return any value.
 */
export default function useAnalytics(): null {
  const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_ACCESS_TOKEN ?? "";

  /**
   * A callback function that tracks a click event with the target element's innerText as the name property.
   *
   * @param {any} e - The click event object.
   */
  const clickEventHandler = useCallback((e: any) => {
    if (!isEmpty(mixpanelToken) && !isEmpty(e.target.innerText)) {
      trackEvent("click", { label: e.target.innerText });
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(mixpanelToken)) {
      mixpanel.init(mixpanelToken, {
        track_pageview: true,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", clickEventHandler);

    return () => {
      document.removeEventListener("click", clickEventHandler);
    };
  });

  return null;
}
