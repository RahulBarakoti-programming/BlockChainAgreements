import Lottie from "lottie-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import Loading from "../assets/loading.json";

export function Loader({ isSubmitting }) {
  return (
    <Dialog open={isSubmitting}>
      <DialogContent className="flex justify-between items-center w-fit">
        <div className="flex flex-col justify-center items-center">
          <Lottie className="w-20" animationData={Loading} loop={true} />
          <DialogFooter>Please Wait...</DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
