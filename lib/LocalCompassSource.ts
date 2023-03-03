import Compass, { loadCompassFromJson } from "./Compass";
import fs from "fs/promises";
import path from "path";
import { CompassSummary } from "./interfaces/CompassSource";
import _ from "lodash";

const compassDirName = "compasses";

const getCompasses: () => Promise<Map<string, Compass>> = async () => {
  const compassDir = path.join(process.cwd(), compassDirName);
  const fileNames = await fs.readdir(compassDir);
  const filePaths = fileNames.map((name) => path.join(compassDir, name));
  const compasses = await Promise.all(
    filePaths.map(async (path) => {
      const fileBuffer = await fs.readFile(path);
      return loadCompassFromJson(fileBuffer.toString());
    })
  );
  const compassTuples = compasses.map((v): [string, Compass] => [v.id, v]);
  return new Map(compassTuples);
};

export const getAvailableCompasses: () => Promise<
  CompassSummary[]
> = async () => {
  const compasses = await getCompasses();
  return Array.from(compasses.values()).map(({ id, name }) => ({
    id,
    name,
  }));
};

export const getCompass: (id: string) => Promise<Compass | undefined> = async (
  name: string
) => {
  console.log(name);
  const compasses = await getCompasses();
  return compasses.get(name);
};

export const LocalCompassSource = {
  getAvailableCompasses,
  getCompass,
};

export default LocalCompassSource;
