import Script from 'next/script';

/**
 * Loads Calendly's widget.js only when the inline booking widget
 * (#calendly-widget) comes within ~800px of the viewport. Loading it on page
 * load added ~2.7 MB to the homepage before anyone scrolled to it.
 * The "Book a call" buttons are plain links and don't need the script.
 */
const LOADER = `(function(){var el=document.getElementById('calendly-widget');function load(){if(window.Calendly||document.getElementById('calendly-js'))return;var s=document.createElement('script');s.id='calendly-js';s.src='https://assets.calendly.com/assets/external/widget.js';s.async=true;document.body.appendChild(s);}if(!el||!('IntersectionObserver' in window)){load();return;}var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();load();}},{rootMargin:'800px 0px'});io.observe(el);})();`;

export default function CalendlyLazy() {
  return (
    <Script id="calendly-lazy" strategy="lazyOnload">
      {LOADER}
    </Script>
  );
}
