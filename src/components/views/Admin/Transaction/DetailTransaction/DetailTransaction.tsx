import { Button, Card, CardBody, Chip, Skeleton } from "@heroui/react";
import useDetailTransaction from "./useDetailTransaction";
import convertIDR from "@/utils/currency";
import { QRCodeSVG } from "qrcode.react";
import { toStandardTime } from "@/utils/date";
import Link from "next/link";
import Script from "next/script";
import environment from "@/config/environment";

const DetailTransaction = () => {
  const { dataEvent, dataOrder, dataTicket } = useDetailTransaction();

  return (
    <Card className="px-5 py-4">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MITRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <CardBody className="gap-8">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Order :</h4>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div>
              <p className="text-sm">Order ID :</p>
              <Skeleton
                isLoaded={!!dataOrder?.orderId}
                className="h4 rounded-md"
              >
                <p className="text-sm font-medium">{dataOrder?.orderId}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm">Ticket :</p>
              <Skeleton isLoaded={!!dataTicket?.name} className="h4 rounded-md">
                <p className="text-sm font-medium">{`${dataTicket?.name} (${convertIDR(dataTicket?.price)}) x ${dataOrder?.quantity}`}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm">Total :</p>
              <Skeleton isLoaded={!!dataOrder?.total} className="h4 rounded-md">
                <p className="text-sm font-medium">
                  {convertIDR(dataOrder?.total)}
                </p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm">Status :</p>
              <Skeleton
                isLoaded={!!dataOrder?.status}
                className="h4 rounded-md"
              >
                <Chip
                  className="capitalize"
                  color={
                    dataOrder?.status === "completed" ? "success" : "warning"
                  }
                  variant="flat"
                  size="sm"
                >
                  {dataOrder?.status}
                </Chip>
              </Skeleton>
            </div>
          </div>
        </div>
        {dataOrder?.status === "completed" && (
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Ticket :</h4>
            <div className="mt-2 flex flex-col gap-4">
              {dataOrder?.vouchers.map((voucher: { voucherId: string }) => (
                <Card
                  shadow="sm"
                  className="p-4 pt-6 lg:p-2"
                  key={`voucher-${voucher.voucherId}`}
                >
                  <CardBody className="gap-2 lg:flex-row lg:gap-8">
                    <div className="mx-auto mb-4 w-2/3 lg:m-0 lg:w-1/5">
                      <QRCodeSVG
                        value={voucher.voucherId}
                        className="!h-full !w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-bold text-danger lg:mb-2">
                        {dataEvent?.name}
                      </h2>
                      <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
                        <div className="text-xs">
                          <p className="text-foreground-500">Date: </p>
                          <p className="font-semibold text-danger">{`${toStandardTime(dataEvent?.startDate)} - ${toStandardTime(dataEvent?.endDate)}`}</p>
                        </div>
                        <div className="text-xs">
                          <p className="text-foreground-500">Location: </p>
                          <p className="font-semibold text-danger">
                            {dataEvent?.isOnline
                              ? "Online"
                              : dataEvent?.location?.address}
                          </p>
                        </div>
                      </div>
                      {dataEvent?.isOnline && (
                        <Button
                          as={Link}
                          color="danger"
                          size="sm"
                          className="w-fit"
                          variant="bordered"
                          href={`${dataEvent?.location?.address}`}
                        >
                          Join Now
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DetailTransaction;
