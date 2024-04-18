import { Button } from './button';

interface SwitchableItemsProps {
  selectedItem: number;
  onItemClick: (item: number) => void;
}

const SwitchableItems = ({ selectedItem, onItemClick }:SwitchableItemsProps) => {
  return (
    <div className='flex justify-between mb-5'>
      <Button
      className={`rounded-none  text-2xl text-white ${selectedItem == 1? ' bg-blue-500':'bg-blue-400'} `}
        onClick={() => onItemClick(1)}
      >
        Doonz
      </Button>
      <Button
      className={`rounded-none  text-2xl text-white ${selectedItem == 2? ' bg-blue-500':'bg-blue-400'} `}

        onClick={() => onItemClick(2)}
      >
        Football Doonz
      </Button>
    </div>
  );
};

export default SwitchableItems