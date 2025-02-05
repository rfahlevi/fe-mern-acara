import { Tab, Tabs } from "@heroui/react";
import useDetailEvent from "./useProfile";
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

export default function DetailEvent() {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useDetailEvent();

  return (
    <Tabs aria-label="Options">
      <Tab key="picture" title="Picture">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="security" title="Security">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
}
