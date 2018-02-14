var words = [
  'friend',
  'yoke',
  'deafening',
  'cluttered',
  'wing',
  'ticket',
  'entertain',
  'husky',
  'place',
  'burn',
  'wicked',
  'drink',
  'waggish',
  'eye',
  'scrape',
  'risk',
  'accept',
  'possible',
  'quicksand',
  'zonked',
  'pancake',
  'attach',
  'scissors',
  'rude',
  'smiling',
  'separate',
  'broken',
  'point',
  'downtown',
  'living',
  'manage',
  'elated',
  'butter',
  'friend',
  'marry',
  'stage',
  'hateful',
  'used',
  'transport',
  'coherent',
  'stomach',
  'occur',
  'frightening',
  'committee',
  'fragile',
  'wreck',
  'teeth',
  'callous',
  'stale',
  'venomous',
  'zebra',
  'throne',
  'event',
  'joke',
  'long',
  'wild',
  'foamy',
  'spiteful',
  'cultured',
  'grip',
  'head',
  'acrid',
  'utter',
  'man',
  'fat',
  'relax',
  'thundering',
  'guttural',
  'roll',
  'metal',
  'one',
  'road',
  'vivacious',
  'unable',
  'macabre',
  'basketball',
  'stranger',
  'note',
  'matter',
  'deserve',
  'retire',
  'nest',
  'wish',
  'moldy',
  'mask',
  'muddled',
  'level',
  'health',
  'wrench',
  'exchange',
  'move',
  'spiders',
  'support',
  'structure',
  'bear',
  'sound',
  'mountainous',
  'list',
  'birds',
  'step',
];

var generateWords = function(size){
  let result = [];
  let word;
  for (let i = 0; i < size; i++){
    word = words[Math.floor(Math.random()*words.length)];
    result.push(word);
  }
  return result;
}

var shuffleWords = function(wordlist){
  for (let i = wordlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordlist[i], wordlist[j]] = [wordlist[j], wordlist[i]];
  }
  return wordlist;
};

module.exports = {
  generateWords,
  shuffleWords
};

