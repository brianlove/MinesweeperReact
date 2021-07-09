
import './GameControls.css';

function GameControls() {
  return (
    <div className="controls">
      <div className="config">
        <div>
          Size:
        </div>
        <div>
          Mines:
        </div>
        <button type="button">
          Reset
        </button>
      </div>
      <div className="info">
        Flags: 
        Mines left:
      </div>
    </div>
  )
}

export default GameControls;