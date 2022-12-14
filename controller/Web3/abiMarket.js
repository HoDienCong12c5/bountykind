export default [
  {
    constant: false,
    inputs: [
      { name: '_orderIds', type: 'uint256[]' },
      { name: '_game', type: 'address[]' },
      { name: '_tokenIds', type: 'uint256[][]' },
      { name: '_price', type: 'uint256[]' },
      { name: '_fiats', type: 'address[][]' }
    ],
    name: 'sellNfts',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'ceoAddress',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_sub', type: 'address' }],
    name: 'setBuyNFTSub',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_tokenId', type: 'uint256' }
    ],
    name: 'ownerOf',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_fiatContract', type: 'address' }],
    name: 'setFiatContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_fee', type: 'string' }
    ],
    name: 'getGameFeePercent',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_tokenId', type: 'uint256' }
    ],
    name: 'resetPrice4sub',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_orderId', type: 'uint256' }
    ],
    name: 'calPrice',
    outputs: [
      { name: '_tokenOwner', type: 'address' },
      { name: '_Price2USD', type: 'uint256' },
      { name: '_fiat', type: 'address[]' },
      { name: '_buyByFiat', type: 'address' },
      { name: '_isBuy', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: '_tokenTRC21s', type: 'address[]' },
      { name: '_amountTRC21s', type: 'uint256[]' }
    ],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_price', type: 'uint256' },
      { name: '_fiatBuy', type: 'address' }
    ],
    name: 'price2wei',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_tokenIds', type: 'uint256[]' }
    ],
    name: 'checkIsOwnerOf',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'fiatContract',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_orderId', type: 'uint256' }
    ],
    name: 'removePrice',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_fee', type: 'uint256' },
      { name: '_limitFee', type: 'uint256' },
      { name: '_creatorFee', type: 'uint256' },
      { name: '_gameFees', type: 'string[]' },
      { name: '_takers', type: 'address[]' },
      { name: '_percents', type: 'uint256[]' }
    ],
    name: 'setLimitFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_orderId', type: 'uint256' },
      { name: '_game', type: 'address' },
      { name: '_tokenIds', type: 'uint256[]' },
      { name: '_Price', type: 'uint256' },
      { name: '_fiat', type: 'address[]' }
    ],
    name: 'setPriceFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'tokensFiat',
    outputs: [
      { name: 'symbol', type: 'string' },
      { name: 'existed', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'BuyNFTSub',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getArrGames',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'Percen',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_games', type: 'address[]' },
      { name: '_fees', type: 'uint256[]' },
      { name: '_limitFees', type: 'uint256[]' },
      { name: '_creatorFees', type: 'uint256[]' },
      { name: '_gameFees', type: 'string[][]' },
      { name: '_takers', type: 'address[][]' },
      { name: '_percents', type: 'uint256[][]' }
    ],
    name: 'setLimitFeeAll',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_fiat', type: 'address[]' }],
    name: 'checkValidFiat',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'arrGames',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_game', type: 'address' }],
    name: 'getGame',
    outputs: [
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'addMinter',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceMinter',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_orderId', type: 'uint256' },
      { name: '_fiatBuy', type: 'address' }
    ],
    name: 'tokenId2wei',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'fiat',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getFiat',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'isMinter',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_address', type: 'address' }],
    name: 'changeCeo',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_orderId', type: 'uint256' }
    ],
    name: 'getTokenPrice',
    outputs: [
      { name: '_maker', type: 'address' },
      { name: '_tokenIds', type: 'uint256[]' },
      { name: '_Price2USD', type: 'uint256' },
      { name: '_fiat', type: 'address[]' },
      { name: '_buyByFiat', type: 'address' },
      { name: '_isBuy', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_game', type: 'address' },
      { name: '_fee', type: 'string' },
      { name: '_price', type: 'uint256' }
    ],
    name: 'calFee',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'Games',
    outputs: [
      { name: 'fee', type: 'uint256' },
      { name: 'limitFee', type: 'uint256' },
      { name: 'creatorFee', type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_fiat', type: 'address' }],
    name: 'getTokensFiat',
    outputs: [
      { name: '__symbol', type: 'string' },
      { name: '_existed', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_symbols', type: 'string[]' },
      { name: 'addrrs', type: 'address[]' }
    ],
    name: 'setFiat',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_game', type: 'address' }],
    name: 'getGameFees',
    outputs: [
      { name: '', type: 'string[]' },
      { name: '', type: 'address[]' },
      { name: '', type: 'uint256[]' },
      { name: '', type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_symbols', type: 'string[]' },
      { indexed: false, name: '_address', type: 'address[]' },
      { indexed: false, name: '_from', type: 'address' }
    ],
    name: 'SetFiat',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_game', type: 'address' },
      { indexed: false, name: '_tokenIds', type: 'uint256[]' },
      { indexed: false, name: '_Price', type: 'uint256' },
      { indexed: false, name: '_type', type: 'uint8' }
    ],
    name: '_setPrice',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_game', type: 'address' },
      { indexed: false, name: '_orderId', type: 'uint256' }
    ],
    name: '_resetPrice',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'previousOwner', type: 'address' },
      { indexed: true, name: 'newOwner', type: 'address' }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'account', type: 'address' }],
    name: 'MinterAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'account', type: 'address' }],
    name: 'MinterRemoved',
    type: 'event'
  }
]
