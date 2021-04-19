export interface ModernArtEvent {
  type:
    | 'start_game'
    | 'update_name'
    | 'step'
    | 'start_auction'
    | 'submit_bid'
    | 'finish_auction'
    | 'skip_bid';
  params: any; // oh no
  timestamp?: number | object;
}

interface Card {
  color: string;
  auctionType: AuctionType;
}

export enum AuctionType {
  OPEN = 'OPEN',
  HIDDEN = 'HIDDEN',
  ONE_OFFER = 'ONE_OFFER',
  FIXED = 'FIXED',
  DOUBLE = 'DOUBLE',
}

export const turnBasedAuctions = [AuctionType.ONE_OFFER, AuctionType.FIXED];

export enum AuctionStatus {
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}

export const colors = ['red', 'green', 'orange', 'blue', 'yellow'];

export const rgbColors: {[key: string]: string} = {
  red: '#CE0000',
  green: '#00950F',
  orange: '#FF8A00',
  blue: '#003CFF',
  yellow: '#FFE600',
};
export const painters: {[key: string]: string} = {
  red: 'Kadinsky',
  green: 'Degas',
  orange: 'Monet',
  blue: 'Van Eyk',
  yellow: 'Picasso',
};
export interface Auction {
  status: AuctionStatus;
  auctioneer: string;
  painting: Card; // auctionType is on Card
  secondPainting?: Card; // DOUBLE
  fixedPrice?: number; // FIXED
  highestBid?: number | null; // ONE_OFFER, HIDDEN, OPEN
  highestBidder?: string | null; // ONE_OFFER, HIDDEN, OPEN
  activeBidder?: string | null; // ONE_OFFER, FIXED
  winner?: string | null; // derived field to standardize across auction types
  payment?: number | null; // derived field to standardize across auction types
}

export interface Round {
  auctions: Auction[];
  players: {
    [id: string]: {
      acquiredArt: Card[];
      score?: number;
    };
  };
  places?: {[color: string]: number};
}

export interface LogMessage {
  text: string;
  hhmm: string;
}

export interface ModernArtPlayer {
  id: string;
  name: string;
  icon: string;
  cards: Card[];
  money: number;
}

export interface ModernArtState {
  started: boolean;
  deck: Card[];
  playerIdx: number;
  players: {
    [id: string]: ModernArtPlayer;
  };
  roundIndex: number;
  roundStarted: boolean;
  rounds: {
    [id: string]: Round;
  };
  currentAuction?: Auction;
  log: LogMessage[];
}

export const initialState: ModernArtState = {
  started: false,
  playerIdx: 0,
  players: {},
  deck: [],
  roundIndex: 0,
  roundStarted: false,
  rounds: {
    '0': {
      auctions: [],
      players: {},
    },
  },
  log: [
    {
      hhmm: '--:--',
      text: 'Welcome to modern art!',
    },
  ],
};
