"use client";

export default function TriggerNotification() {
  const sendNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Pengumuman untuk Anda", {
        body: "Pesanan untuk Ridsor telah selesai!!",
        icon: "/favicon.png",
      });
    }
  };

  return (
    <button
      type="button"
      className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
      onClick={sendNotification}>
      Trigger Notification
    </button>
  );
}
