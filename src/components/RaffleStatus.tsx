interface RaffleStatusProps{
    raffleStatus: boolean,
}

export default function RaffleStatus({raffleStatus}:RaffleStatusProps) {
    const backgroundColor = raffleStatus? "bg-green-200":"bg-red-200";
    const borderColor = raffleStatus? "border-green-500":"border-red-500";
    const textColor = raffleStatus? "text-green-700":"text-red-700";


  return (
    <div className={`py-2 rounded-md px-5 w-full text-center ${backgroundColor} border border-solid ${borderColor} ${textColor}`}>
        <h3 className="text-sm">Raffle Status: {raffleStatus? "Open":"Closed"}</h3>

    </div>
  )
}
