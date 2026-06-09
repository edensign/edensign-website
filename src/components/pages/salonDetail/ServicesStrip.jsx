/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useSelector } from 'react-redux';

/* ── Icon map — keyed by lowercase service name (or partial match) ── */
const SERVICE_ICONS = {
  skincare: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <g clipPath='url(#clip0)' fill="#c9a96e">
        <path d="M43.267 19.8h-.734v-3.667a.733.733 0 0 0-.733-.733h-.807a3.436 3.436 0 0 0-3.593-2.933c-2.378 0-2.806-.587-2.88-.767-.237-.573.574-1.76 1.197-2.38a.733.733 0 0 0-.517-1.253c-2.34.02-4.64.611-6.7 1.72a16.695 16.695 0 0 0-11.633-4.654C7.55 5.133 0 12.685 0 22c0 9.315 7.551 16.867 16.867 16.867h23.466A3.67 3.67 0 0 0 44 35.2V20.533a.733.733 0 0 0-.733-.733zm-26.4-2.933h24.2V19.8H16.133v-2.933h.734zm16.297-4.61c.464 1.129 1.85 1.676 4.236 1.676a1.972 1.972 0 0 1 2.088 1.467H22.19c1.114-.594 2.189-1.313 3.288-2.048 2.424-1.622 4.92-3.291 8.14-3.716a2.99 2.99 0 0 0-.455 2.622zM1.467 22c.009-8.501 6.898-15.39 15.4-15.4a15.233 15.233 0 0 1 10.273 3.942c-.866.513-1.687 1.062-2.477 1.59-2.511 1.681-4.884 3.268-7.796 3.268H15.4a.733.733 0 0 0-.733.733V19.8h-.734a.733.733 0 0 0-.733.733V35.2c.003.663.188 1.313.535 1.878A15.426 15.426 0 0 1 1.467 22zm41.066 13.2a2.2 2.2 0 0 1-2.2 2.2H16.867a2.2 2.2 0 0 1-2.2-2.2V21.267h27.866V35.2z" />
        <path d="M28.6 24.2c-4.523 0-8.067 2.255-8.067 5.133 0 2.879 3.544 5.134 8.067 5.134s8.066-2.255 8.066-5.134c0-2.878-3.543-5.133-8.066-5.133zm0 8.8c-3.577 0-6.6-1.68-6.6-3.667 0-1.987 3.023-3.666 6.6-3.666 3.577 0 6.6 1.679 6.6 3.666 0 1.988-3.023 3.667-6.6 3.667z" />
      </g>
    </svg>
  ),
  lips: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <path d="M11 44h7.333a2.2 2.2 0 0 0 2.2-2.2V15.4a.733.733 0 0 0-.733-.733v-6.6a.733.733 0 0 0-.733-.734v-2.2a.733.733 0 0 0-.734-.733v-.733a3.667 3.667 0 0 0-7.333 0V4.4a.733.733 0 0 0-.733.733v2.2a.733.733 0 0 0-.734.734v6.6a.733.733 0 0 0-.733.733v26.4A2.2 2.2 0 0 0 11 44zm8.067-2.2a.733.733 0 0 1-.734.733H11a.733.733 0 0 1-.733-.733V16.133h8.8V41.8zm-6.6-38.133a2.2 2.2 0 0 1 4.4 0V4.4h-4.4v-.733zm-.734 2.2H17.6v1.466h-5.867V5.867zM11 8.8h7.333v5.867H11V8.8zM24.2 44h10.267a.733.733 0 0 0 .733-.733V33a5.139 5.139 0 0 0-5.133-5.133H28.6A5.139 5.139 0 0 0 23.467 33v10.267c0 .405.328.733.733.733zm.733-11a3.67 3.67 0 0 1 3.667-3.667h1.467A3.671 3.671 0 0 1 33.733 33v9.533h-8.8V33z" fill="#c9a96e" />
    </svg>
  ),
  hair: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <path d="M32.621 4.552c.419 0 .759-.34.759-.759V.76A.759.759 0 0 0 32.62 0H17.45a2.276 2.276 0 0 0 0 4.552h2.275v1.517h-.758a.759.759 0 0 0-.759.759v4.545c-4.412 1.776-7.586 6.542-7.586 12.144v18.207A2.276 2.276 0 0 0 12.897 44h18.207a2.276 2.276 0 0 0 2.276-2.276V23.517c0-5.602-3.174-10.368-7.587-12.144V6.828a.759.759 0 0 0-.758-.759h-.759V4.552h8.345zm-15.93-2.276c0-.42.339-.759.758-.759h14.413v1.517H17.45a.759.759 0 0 1-.759-.758zm15.172 21.241v18.207c0 .42-.34.759-.76.759H12.898a.759.759 0 0 1-.759-.759V23.517c0-6.274 4.425-11.38 9.862-11.38 5.438 0 9.863 5.106 9.863 11.38zM19.724 10.621V7.586h4.552v3.035h-4.552zm3.035-4.552h-1.517V4.552h1.517v1.517z" fill="#c9a96e" />
      <path d="M14.414 23.517V38.69c0 .419.34.758.759.758h13.655c.419 0 .759-.34.759-.758V23.517a.759.759 0 0 0-.76-.758H15.174a.759.759 0 0 0-.759.758zm1.517.759H28.07V37.93H15.931V24.276z" fill="#c9a96e" />
    </svg>
  ),
  eye: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <g clipPath='url(#clip0)' fill="#c9a96e">
        <path d="M18.325 8.067h-2.933a.733.733 0 0 0-.733.733v2.63l-2.719 2.718v.005c-.005.005-.007.013-.012.019a.7.7 0 0 0-.153.27.705.705 0 0 0-.034.197c0 .017-.01.03-.008.047l.726 27.114a2.2 2.2 0 0 0 2.2 2.2h4.4a2.2 2.2 0 0 0 2.2-2.18l.733-27.134c0-.016-.008-.03-.008-.046a.72.72 0 0 0-.06-.27.713.713 0 0 0-.127-.197l-.013-.02v-.004l-2.725-2.72V8.8a.733.733 0 0 0-.734-.733zm-2.2 1.466h1.467V11h-1.467V9.533zM19.792 41.8a.733.733 0 0 1-.733.733h-4.4a.738.738 0 0 1-.734-.753l-.713-26.38h7.293l-.713 26.4zm-5.563-27.867l1.467-1.466h2.326l1.466 1.466h-5.26zM31.526 20.533h-2.2v-11h.733a.733.733 0 0 0 0-1.466h-.733v-.734h.733a.733.733 0 0 0 0-1.466h-.733v-.734h1.466a.733.733 0 0 0 0-1.466h-1.466v-.734h1.466a.733.733 0 0 0 0-1.466h-1.466V.733a.733.733 0 0 0-1.467 0v.734h-1.467a.733.733 0 0 0 0 1.466h1.467v.734h-1.467a.733.733 0 0 0 0 1.466h1.467v.734h-.733a.733.733 0 0 0 0 1.466h.733v.734h-.733a.733.733 0 0 0 0 1.466h.733v11h-2.2a.733.733 0 0 0-.733.734V41.8a2.2 2.2 0 0 0 2.2 2.2h2.933a2.2 2.2 0 0 0 2.2-2.2V21.267a.733.733 0 0 0-.733-.734zM30.792 41.8a.733.733 0 0 1-.733.733h-2.933a.733.733 0 0 1-.734-.733V22h4.4v19.8z" />
      </g>
    </svg>
  ),
  nails: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <path d="M26.4 0h-8.8a.733.733 0 0 0-.733.733V22h-4.4a2.2 2.2 0 0 0-2.2 2.2v17.6a2.2 2.2 0 0 0 2.2 2.2h19.066a2.2 2.2 0 0 0 2.2-2.2V24.2a2.2 2.2 0 0 0-2.2-2.2h-4.4V.733A.733.733 0 0 0 26.4 0zm-8.067 1.467h7.334V22h-7.334V1.467zM32.267 24.2v17.6a.733.733 0 0 1-.734.733H12.467a.733.733 0 0 1-.734-.733V24.2c0-.405.329-.733.734-.733h19.066c.405 0 .734.328.734.733z" fill="#c9a96e" />
      <path d="M13.39 25.175a.735.735 0 0 0-.186.565l1.335 13.347a2.193 2.193 0 0 0 2.189 1.98h10.545a2.193 2.193 0 0 0 2.189-1.98L30.8 25.74a.735.735 0 0 0-.733-.807H13.934a.733.733 0 0 0-.544.242zm7.877 1.225v5.133a.733.733 0 0 0-.723.613l-.733 4.4a.733.733 0 0 0 .723.854h2.933a.733.733 0 0 0 .723-.854l-.734-4.4a.733.733 0 0 0-.723-.613V26.4h6.527l-1.254 12.54a.733.733 0 0 1-.733.66H16.728a.733.733 0 0 1-.73-.66L14.744 26.4h6.523zm.621 6.6h.224l.489 2.933H21.4L21.888 33z" fill="#c9a96e" />
    </svg>
  ),
  fragrance: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <path d="M33 41.8V13.933a.352.352 0 0 0-.009-.042.699.699 0 0 0-.173-.43.644.644 0 0 0-.057-.064c-.01-.009-.015-.02-.025-.028l-4.522-3.77 3.932.656a.733.733 0 0 0 .78-1.05L31.62 6.6l1.307-2.606a.732.732 0 0 0-.777-1.05l-4.283.712V2.2a2.2 2.2 0 0 0-2.2-2.2h-7.333a2.2 2.2 0 0 0-2.2 2.2v1.456l-4.28-.712a.732.732 0 0 0-.777 1.05L12.38 6.6l-1.303 2.606a.734.734 0 0 0 .778 1.05l3.932-.655-4.523 3.77c-.01.007-.015.019-.024.028a.696.696 0 0 0-.057.064.733.733 0 0 0-.133.225.688.688 0 0 0-.04.205.368.368 0 0 0-.01.04V41.8a2.2 2.2 0 0 0 2.2 2.2h17.6a2.2 2.2 0 0 0 2.2-2.2zM30.14 6.928l.824 1.645L24.2 7.445v-1.69l6.768-1.128-.824 1.645a.732.732 0 0 0 0 .656h-.004zM17.6 2.2c0-.405.329-.733.734-.733h7.333c.405 0 .733.328.733.733v1.701l-2.994.499h-2.811L17.6 3.901V2.2zm3.667 3.667h1.467v1.466h-1.467V5.867zm-7.407.405l-.827-1.645L19.8 5.755v1.69l-6.767 1.128.827-1.645a.732.732 0 0 0 0-.656zm4.794 2.852l1.94-.324h2.812l1.944.324 4.891 4.076H13.76l4.895-4.076zM31.534 41.8a.733.733 0 0 1-.734.733H13.2a.733.733 0 0 1-.733-.733V14.667h19.067V41.8z" fill="#c9a96e" />
      <path d="M16.134 30.067h11.733a.733.733 0 0 0 .733-.734v-8.066a.733.733 0 0 0-.733-.734H16.134a.733.733 0 0 0-.734.734v8.066c0 .405.329.734.734.734zM16.867 22h10.267v6.6H16.867V22z" fill="#c9a96e" />
    </svg>
  ),
  massage: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 100 100' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <path d="M50 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm-20 30l-8 30h10l5-20 13 8v22h10V55l-13-8 4-7h14V30H42l-12 10zm0 0" fill="#c9a96e" />
    </svg>
  ),
  makeup: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none" style={{ transition: 'all 0.3s ease' }}>
      <g fill="#c9a96e">
        <path d="M18 12c-7.73 0-14 6.27-14 14s6.27 14 14 14 14-6.27 14-14-6.27-14-14-14zm0 25c-6.07 0-11-4.93-11-11s4.93-11 11-11 11 4.93 11 11-4.93 11-11 11z"/>
        <rect x="16" y="9" width="4" height="3" rx="1"/>
        <circle cx="18" cy="26" r="7" opacity="0.3"/>
        <path d="M37.8 7.2l-1.4-1.4c-.8-.8-2-.8-2.8 0L20.2 19.2l4.2 4.2L37.8 10c.8-.8.8-2 0-2.8z"/>
        <path d="M34.3 10.7l-2.1-2.1 1.4-1.4 2.1 2.1z" opacity="0.8"/>
        <path d="M35.7 5.7c-.5-.5-1.3-.5-1.8 0L31.5 8.1l4.4 4.4 2.4-2.4c.5-.5.5-1.3 0-1.8l-2.6-2.6z"/>
      </g>
    </svg>
  ),
  waxing: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none">
      <rect x="6" y="10" width="32" height="24" rx="4" stroke="#c9a96e" strokeWidth="2.5" fill="none" />
      <path d="M12 22h20M12 17h8M12 27h14" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  threading: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none">
      <path d="M8 36 Q16 20 22 14 Q28 8 36 8" stroke="#c9a96e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M8 28 Q18 22 24 16 Q30 10 38 8" stroke="#c9a96e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  facial: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none">
      <circle cx="22" cy="18" r="12" stroke="#c9a96e" strokeWidth="2.5" fill="none" />
      <path d="M16 22c1.5 3 10.5 3 12 0" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="17" r="2" fill="#c9a96e" />
      <circle cx="27" cy="17" r="2" fill="#c9a96e" />
      <path d="M14 38c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#c9a96e" strokeWidth="2" fill="none" />
    </svg>
  ),
  spa: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none">
      <path d="M22 8C14 14 8 20 8 28c0 6 6 10 14 10s14-4 14-10c0-8-6-14-14-20z" stroke="#c9a96e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M22 28c-4-4-6-8-4-12" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  ),
  beard: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none">
      <circle cx="22" cy="15" r="9" stroke="#c9a96e" strokeWidth="2.5" fill="none" />
      <path d="M13 24c-3 4-4 10 9 12s12-8 9-12" stroke="#c9a96e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M22 27v9" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  default: (
    <svg xmlns='http://www.w3.org/2000/svg' height="36" width="36" viewBox='0 0 44 44' fill="none">
      <path d="M22 4C12.1 4 4 12.1 4 22s8.1 18 18 18 18-8.1 18-18S31.9 4 22 4zm0 34C13.2 38 6 30.8 6 22S13.2 6 22 6s16 7.2 16 16-7.2 16-16 16z" fill="#c9a96e" />
      <path d="M22 12c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#c9a96e" opacity="0.5" />
    </svg>
  ),
};

/** Match a service name to an icon key */
const getIconForService = (serviceName) => {
  if (!serviceName) return SERVICE_ICONS.default;
  const lower = serviceName.toLowerCase();
  if (lower.includes('skin')) return SERVICE_ICONS.skincare;
  if (lower.includes('lip') || lower.includes('blush')) return SERVICE_ICONS.lips;
  if (lower.includes('hair') || lower.includes('cut') || lower.includes('color')) return SERVICE_ICONS.hair;
  if (lower.includes('eye') || lower.includes('brow') || lower.includes('lash')) return SERVICE_ICONS.eye;
  if (lower.includes('nail') || lower.includes('mani') || lower.includes('pedi')) return SERVICE_ICONS.nails;
  if (lower.includes('fragrance') || lower.includes('perfume')) return SERVICE_ICONS.fragrance;
  if (lower.includes('massage') || lower.includes('body')) return SERVICE_ICONS.massage;
  if (lower.includes('makeup') || lower.includes('make-up')) return SERVICE_ICONS.makeup;
  if (lower.includes('wax')) return SERVICE_ICONS.waxing;
  if (lower.includes('thread')) return SERVICE_ICONS.threading;
  if (lower.includes('facial') || lower.includes('face')) return SERVICE_ICONS.facial;
  if (lower.includes('spa') || lower.includes('relax')) return SERVICE_ICONS.spa;
  if (lower.includes('beard') || lower.includes('shave') || lower.includes('shav')) return SERVICE_ICONS.beard;
  return SERVICE_ICONS.default;
};

const ServicesStrip = () => {
  const { salon } = useSelector(state => state.salonDetail);

  // salon.services is an array of service objects (filtered from the master list in SalonDetail.jsx)
  const salonServices = salon?.services;

  // If no services data yet, show nothing
  if (!salonServices || salonServices.length === 0) return null;

  // Compute dynamic stats
  const staffCount = salon?.staff_count || null;
  const occupancy = salon?.occupancy || null;
  const established = salon?.established_on
    ? new Date(salon.established_on).getFullYear()
    : null;
  const yearsOpen = established ? new Date().getFullYear() - established : null;

  // Duplicate the services list to create a seamless infinite running carousel / marquee loop
  const duplicatedServices = [...salonServices, ...salonServices, ...salonServices];

  return (
    <>
      <section className="services-strip-wrapper">
        <nav aria-label="Services provided by this salon">
          <div className="services-marquee-container">
            <div className="services-marquee-track">
              {duplicatedServices.map((svc, i) => (
                <div key={i} className="services-item-marquee">
                  {getIconForService(svc.name)}
                  <span className="services-text-marquee">{svc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default ServicesStrip;
