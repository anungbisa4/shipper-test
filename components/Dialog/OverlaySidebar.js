import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const OverlaySidebar = ({ open, setOpen }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpen(!open)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-700 opacity-70" />
        </Transition.Child>
        <button />
      </Dialog>
    </Transition>
  );
};

export default OverlaySidebar;
