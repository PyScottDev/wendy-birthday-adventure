import React from 'react';

const ALL_ITEMS = [
  { id: 'theatre key', name: 'Theatre Key', emoji: '🔑', desc: 'A heavy, ornate brass key found deep beneath the Gielgud.' },
  { id: 'silver tap shoe', name: 'Silver Tap Shoe', emoji: '🥿', desc: 'A magical, sparkling shoe that taps rhythms all by itself.' },
  { id: 'marked-up script', name: 'Marked-Up Script', emoji: '📜', desc: "A legendary director's script with notes written in gold ink." },
  { id: 'gold theatre ticket', name: 'Gold Ticket', emoji: '🎟️', desc: 'A shimmering, warm ticket filled with theatrical magic.' },
  { id: 'birthday candle', name: 'Birthday Candle', emoji: '🕯️', desc: 'An everlasting candle given by a street child in 1850.' }
];

export default function Inventory({ items = [] }) {
  return (
    <div className="prop-table-container">
      <h3 className="prop-table-title">🎭 Wendy's Backstage Prop Table</h3>
      <div className="prop-table-slots">
        {ALL_ITEMS.map((definedItem) => {
          const isCollected = items.includes(definedItem.id);
          return (
            <div 
              key={definedItem.id} 
              className={`prop-slot ${isCollected ? 'collected' : 'empty'}`}
              title={isCollected ? `${definedItem.name}: ${definedItem.desc}` : 'Locked Slot'}
            >
              <div className="prop-emoji">{isCollected ? definedItem.emoji : '❓'}</div>
              <div className="prop-name">{isCollected ? definedItem.name : 'Undiscovered'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
