import Compass from "../Compass";

export interface CompassSummary {
  id: string;
  name: string;
}

export default interface CompassSource {
  getAvailableCompasses: () => Promise<CompassSummary[]>;
  getCompass: (name: string) => Promise<Compass | undefined>;
}
