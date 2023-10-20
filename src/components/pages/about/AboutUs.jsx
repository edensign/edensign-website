import ServiceListBottom from "../../common/ServiceListBottom";
import AboutCEO from "./AboutCEO";
import AboutPageTop from "./AboutPageTop";
import MissionComponent from "./MissionComponent";
import Newsletter from "../../common/Newsletter";

const AboutUs = () => {
    return (
        <>
        <div className="ourcomponent">
            <AboutPageTop />
            <MissionComponent />
            <AboutCEO />
            <ServiceListBottom />
            <Newsletter/>
            </div>
        </>
    )
}

export default AboutUs;
