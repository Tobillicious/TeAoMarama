// English Wordle Game
class EnglishWordleGame {
    constructor() {
        this.targetWord = '';
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.guesses = [];
        
        // Common 5-letter English words for educational purposes
        this.wordList = [
            'ERUPT', 'ESSAY', 'ETHER', 'ETHIC', 'ETHOS', 'ETHYL', 'ETUDE', 'EUROS', 'EVADE', 'EVENS', 
            'EVENT', 'EVERY', 'EVICT', 'EVILS', 'EVOKE', 'EWERS', 'EXACT', 'EXALT', 'EXAMS', 'EXCEL', 
            'EXECS', 'EXERT', 'EXILE', 'EXIST', 'EXITS', 'EXPAT', 'EXPEL', 'EXPOS', 'EXTOL', 'EXTRA', 
            'EXUDE', 'EXULT', 'EXURB', 'EYING', 'EYRIE', 'FABLE', 'FACED', 'FACER', 'FACES', 'FACET', 
            'FACIA', 'FACTS', 'FADED', 'FADER', 'FADES', 'FAERY', 'FAILS', 'FAINT', 'FAIRS', 'FAIRY', 
            'FAITH', 'FAKED', 'FAKER', 'FAKES', 'FAKIE', 'FAKIR', 'FALLS', 'FAMED', 'FANCY', 'FANGS', 
            'FANNY', 'FARCE', 'FARED', 'FARES', 'FARMS', 'FARTS', 'FASTS', 'FATAL', 'FATED', 'FATES', 
            'FATSO', 'FATTY', 'FATWA', 'FAULT', 'FAUNA', 'FAUNS', 'FAVAS', 'FAVES', 'FAVOR', 'FAWNS', 
            'FAXED', 'FAXES', 'FAZED', 'FAZES', 'FEARS', 'FEAST', 'FEATS', 'FECAL', 'FECES', 'FEEDS', 
            'FEELS', 'FEIGN', 'FEINT', 'FELLA', 'FELLS', 'FELON', 'FELTS', 'FEMME', 'FEMUR', 'FENCE', 
            'FENDS', 'FERAL', 'FERIA', 'FERNS', 'FERNY', 'FERRY', 'FESTS', 'FETAL', 'FETCH', 'FETED', 
            'FETES', 'FETID', 'FETUS', 'FEUDS', 'FEVER', 'FEWER', 'FIATS', 'FIBER', 'FIBRE', 'FICHE', 
            'FICUS', 'FIEFS', 'FIELD', 'FIEND', 'FIERY', 'FIFES', 'FIFTH', 'FIFTY', 'FIGHT', 'FILCH', 
            'FILED', 'FILER', 'FILES', 'FILET', 'FILLS', 'FILLY', 'FILMS', 'FILMY', 'FILTH', 'FINAL', 
            'FINCA', 'FINCH', 'FINDS', 'FINED', 'FINER', 'FINES', 'FINIS', 'FINKS', 'FIORD', 'FIRED', 
            'FIRES', 'FIRMS', 'FIRST', 'FISHY', 'FISTS', 'FITLY', 'FIVER', 'FIVES', 'FIXED', 'FIXER', 
            'FIXES', 'FIZZY', 'FJORD', 'FLACK', 'FLAGS', 'FLAIL', 'FLAIR', 'FLAKE', 'FLAKY', 'FLAME', 
            'FLANK', 'FLANS', 'FLAPS', 'FLARE', 'FLASH', 'FLASK', 'FLATS', 'FLAWS', 'FLAYS', 'FLEAS', 
            'FLECK', 'FLEES', 'FLEET', 'FLESH', 'FLICK', 'FLIER', 'FLIES', 'FLING', 'FLOAT', 'FLOOD', 
            'FLOOR', 'FLOUR', 'FLOWN', 'FLOWS', 'FLUID', 'FLYER', 'FOCAL', 'FOCUS', 'FOLKS', 'FONTS', 
            'FOODS', 'FORCE', 'FORMS', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRAUD', 'FRESH', 
            'FRIED', 'FRIES', 'FRONT', 'FROST', 'FRUIT', 'FUELS', 'FULLY', 'FUNDS', 'FUNNY', 'GAINS', 
            'GAMES', 'GAMMA', 'GASES', 'GATES', 'GAUGE', 'GEARS', 'GENES', 'GENRE', 'GHOST', 'GIANT', 
            'GIFTS', 'GIRLS', 'GIVEN', 'GIVES', 'GLAND', 'GLASS', 'GLOBE', 'GLORY', 'GLOSS', 'GLOVE', 
            'GLUED', 'GOALS', 'GOATS', 'GOING', 'GOODS', 'GRACE', 'GRADE', 'GRAIN', 'GRAMS', 'GRAND', 
            'GRANT', 'GRAPE', 'GRAPH', 'GRASP', 'GRASS', 'GRAVE', 'GREAT', 'GREEK', 'GREEN', 'GREET', 
            'GRIEF', 'GRILL', 'GRIND', 'GRIPS', 'GROSS', 'GROUP', 'GROVE', 'GROWN', 'GROWS', 'GUARD', 
            'GUESS', 'GUEST', 'GUIDE', 'GUILD', 'GUILT', 'HABIT', 'HAIRS', 'HALLS', 'HANDS', 'HANDY', 
            'HANGS', 'HAPPY', 'HARSH', 'HATED', 'HATES', 'HAVEN', 'HAWKS', 'HEADS', 'HEARD', 'HEART', 
            'HEAVY', 'HEDGE', 'HEELS', 'HELLO', 'HELPS', 'HENCE', 'HERBS', 'HIGHS', 'HILLS', 'HINTS', 
            'HIRED', 'HOBBY', 'HOLDS', 'HOLES', 'HOLLY', 'HOMES', 'HONEY', 'HONOR', 'HOOKS', 'HOPED', 
            'HOPES', 'HORNS', 'HORSE', 'HOSTS', 'HOTEL', 'HOURS', 'HOUSE', 'HOVER', 'HUMAN', 'HUMOR', 
            'XENIC', 'XENON', 'XERIC', 'XEROX', 'XERUS', 'XOANA', 'XRAYS', 'XYLAN', 'XYLEM', 'XYLIC', 
            'XYLOL', 'XYLYL', 'XYSTI', 'XYSTS', 'YAARS', 'YABAS', 'YABBA', 'YABBY', 'YACCA', 'YACHT', 
            'YACKA', 'YACKS', 'YAFFS', 'YAGER', 'YAGES', 'YAGIS', 'YAHOO', 'YAIRD', 'YAKKA', 'YAKOW', 
            'YALES', 'YAMEN', 'YAMPY', 'YAMUN', 'YANGS', 'YANKS', 'YAPOK', 'YAPON', 'YAPPS', 'YAPPY', 
            'YARAK', 'YARCO', 'YARDS', 'YARER', 'YARFA', 'YARKS', 'YARNS', 'YARRS', 'YARTA', 'YARTO', 
            'YATES', 'YAUDS', 'YAULD', 'YAUPS', 'YAWED', 'YAWEY', 'YAWLS', 'YAWNS', 'YAWNY', 'YAWPS', 
            'YBORE', 'YCLAD', 'YCLED', 'YCOND', 'YDRAD', 'YDRED', 'YEADS', 'YEAHS', 'YEALM', 'YEANS', 
            'YEARD', 'YEARN', 'YEARS', 'YEAST', 'YECCH', 'YECHS', 'YECHY', 'YEDES', 'YEEDS', 'YEESH', 
            'YEGGS', 'YELKS', 'YELLS', 'YELMS', 'YELPS', 'YELTS', 'YENTA', 'YENTE', 'YERBA', 'YERDS', 
            'YERKS', 'YESES', 'YESKS', 'YESTS', 'YESTY', 'YETIS', 'YETTS', 'YEUKS', 'YEUKY', 'YEVEN', 
            'YEVES', 'YEWEN', 'YEXED', 'YEXES', 'YFERE', 'YIELD', 'YIKED', 'YIKES', 'YILLS', 'YINCE', 
            'YIPES', 'YIPPY', 'YIRDS', 'YIRKS', 'YIRRS', 'YIRTH', 'YITES', 'YITIE', 'YLEMS', 'YLIKE', 
            'YLKES', 'YMOLT', 'YMPES', 'YOBBO', 'YOBBY', 'YOCKS', 'YODEL', 'YODHS', 'YODLE', 'YOGAS', 
            'YOGEE', 'YOGHS', 'YOGIC', 'YOGIN', 'YOGIS', 'YOICK', 'YOJAN', 'YOKED', 'YOKEL', 'YOKER', 
            'YOKES', 'YOKUL', 'YOLKS', 'YOLKY', 'YOMIM', 'YOMPS', 'YONIC', 'YONIS', 'YONKS', 'YOOFS', 
            'YOOPS', 'YORES', 'YORKS', 'YORPS', 'YOUKS', 'YOUNG', 'YOURN', 'YOURS', 'YOURT', 'YOUSE', 
            'YOUTH', 'YOWED', 'YOWES', 'YOWIE', 'YOWLS', 'YOWZA', 'YRAPT', 'YRENT', 'YRIVD', 'YRNEH', 
            'YSAME', 'YTOST', 'YUANS', 'YUCAS', 'YUCCA', 'YUCCH', 'YUCKO', 'YUCKS', 'YUCKY', 'YUFTS', 
            'YUGAS', 'YUKED', 'YUKES', 'YUKKY', 'YUKOS', 'YULAN', 'YULES', 'YUMMO', 'YUMMY', 'YUMPS', 
            'YUPON', 'YUPPY', 'YURTA', 'YURTS', 'YUZUS', 'ZABRA', 'ZACKS', 'ZAIDA', 'ZAIDY', 'ZAIRE', 
            'ZAKAT', 'ZAMAN', 'ZAMBO', 'ZAMIA', 'ZANJA', 'ZANTE', 'ZANZA', 'ZANZE', 'ZAPPY', 'ZARFS', 
            'ZARIS', 'ZATIS', 'ZAXES', 'ZAYIN', 'ZAZEN', 'ZEALS', 'ZEBEC', 'ZEBRA', 'ZEBUB', 'ZEBUS', 
            'ZEDAS', 'ZEINS', 'ZENDO', 'ZERDA', 'ZERKS', 'ZEROS', 'ZESTS', 'ZESTY', 'ZETAS', 'ZEXES', 
            'ZEZES', 'ZHOMO', 'ZIBET', 'ZIFFS', 'ZIGAN', 'ZILAS', 'ZILCH', 'ZILLA', 'ZILLS', 'ZIMBI', 
            'ZIMBS', 'ZINCO', 'ZINCS', 'ZINCY', 'ZINEB', 'ZINES', 'ZINGS', 'ZINGY', 'ZINKE', 'ZINKY', 
            'ZIPPO', 'ZIPPY', 'ZIRAM', 'ZITIS', 'ZIZEL', 'ZIZIT', 'ZLOTE', 'ZLOTY', 'ZOAEA', 'ZOBOS', 
            'ZOBUS', 'ZOCCO', 'ZOEAE', 'ZOEAL', 'ZOEAS', 'ZOISM', 'ZOIST', 'ZOMBI', 'ZONAE', 'ZONAL', 
            'ZONDA', 'ZONED', 'ZONER', 'ZONES', 'ZONKS', 'ZOOEA', 'ZOOEY', 'ZOOID', 'ZOOKS', 'ZOOMS', 
            'ZOONS', 'ZOOTY', 'ZOPPA', 'ZOPPO', 'ZORIL', 'ZORIS', 'ZORRO', 'ZOUKS', 'ZOWEE', 'ZOWIE', 
            'ZULUS', 'ZUPAN', 'ZUPAS', 'ZUPPA', 'ZURFS', 'ZUZIM', 'ZYGAL', 'ZYGON', 'ZYMES', 'ZYMIC'
        ];
        
        // Word definitions
        this.definitions = {
            'ABOUT': 'concerning or regarding; approximately',
            'ABOVE': 'at a higher level than; more than',
            'ABUSE': 'to use wrongly; cruel treatment',
            'ACTOR': 'person who acts in plays or films',
            'ACUTE': 'sharp; severe; having keen perception',
            'ADMIT': 'to confess; allow to enter',
            'ADOPT': 'to take as one\'s own; choose',
            'ADULT': 'fully grown; mature person',
            'AFTER': 'following in time; behind',
            'AGAIN': 'once more; another time',
            'AGENT': 'person acting on behalf of another',
            'AGREE': 'to have same opinion; consent',
            'AHEAD': 'in front; in advance',
            'ALARM': 'warning signal; cause fear',
            'ALBUM': 'book for photos; collection',
            'ALERT': 'watchful; warning signal',
            'ALIEN': 'foreign; extraterrestrial being',
            'ALIGN': 'to arrange in straight line',
            'ALIKE': 'similar; in same manner',
            'ALIVE': 'living; full of life',
            'ALLOW': 'to permit; give permission',
            'ALONE': 'by oneself; solitary',
            'ALONG': 'by length of; together with',
            'ALTER': 'to change; modify',
            'AMONG': 'surrounded by; part of group',
            'ANGER': 'strong feeling of displeasure',
            'ANGLE': 'corner; point of view',
            'ANGRY': 'feeling anger; mad',
            'APART': 'separated; away from others',
            'APPLE': 'round fruit from apple tree',
            'APPLY': 'to put to use; request formally',
            'ARENA': 'enclosed area for sports',
            'ARGUE': 'to give reasons; dispute',
            'ARISE': 'to get up; come into being',
            'ARRAY': 'ordered arrangement; display',
            'ASIDE': 'to one side; apart',
            'ASSET': 'valuable possession; advantage',
            'AUDIO': 'relating to sound or hearing',
            'AVOID': 'to keep away from; prevent',
            'AWAKE': 'not sleeping; alert',
            'AWARD': 'prize given for achievement',
            'AWARE': 'having knowledge; conscious',
            'BASIC': 'fundamental; essential',
            'BEACH': 'shore of sea or lake',
            'BEGIN': 'to start; commence',
            'BEING': 'existence; living creature',
            'BELOW': 'at lower level; underneath',
            'BENCH': 'long seat; work table',
            'BIRTH': 'act of being born',
            'BLACK': 'darkest color; without light',
            'BLAME': 'to find fault; responsibility',
            'BLANK': 'empty; without writing',
            'BLAST': 'explosion; strong wind',
            'BLIND': 'cannot see; without sight',
            'BLOCK': 'solid piece; obstruct',
            'BLOOD': 'red liquid in body',
            'BOARD': 'flat piece of wood; committee',
            'BOOST': 'to increase; help upward',
            'BOOTH': 'small enclosed space',
            'BOUND': 'tied; certain to happen',
            'BRAIN': 'organ of thought in head',
            'BRAND': 'trademark; mark with hot iron',
            'BRAVE': 'showing courage; fearless',
            'BREAD': 'food made from flour',
            'BREAK': 'to separate into pieces',
            'BREED': 'to produce offspring; type',
            'BRIEF': 'short in time; concise',
            'BRING': 'to carry here; cause',
            'BROAD': 'wide; extensive',
            'BROWN': 'color like chocolate',
            'BUILD': 'to construct; create',
            'BUILT': 'constructed; made',
            'BURST': 'to break open suddenly',
            'CARRY': 'to transport; support weight',
            'CATCH': 'to capture; grab',
            'CAUSE': 'reason; make happen',
            'CHAIN': 'series of connected links',
            'CHAIR': 'seat with back',
            'CHAOS': 'complete disorder',
            'CHARM': 'attractiveness; lucky object',
            'CHART': 'map; graph showing data',
            'CHASE': 'to pursue; run after',
            'CHEAP': 'low in price; inferior',
            'CHECK': 'to examine; verify',
            'CHEST': 'body from neck to waist',
            'CHILD': 'young human being',
            'CHINA': 'country in Asia; porcelain',
            'CHOSE': 'past tense of choose',
            'CIVIL': 'relating to citizens; polite',
            'CLAIM': 'to assert; demand as right',
            'CLASS': 'group of students; category',
            'CLEAN': 'free from dirt; pure',
            'CLEAR': 'easy to see through; obvious',
            'CLICK': 'short sharp sound',
            'CLIMB': 'to go up; ascend',
            'CLOCK': 'instrument showing time',
            'CLOSE': 'near; to shut',
            'CLOUD': 'mass of water vapor in sky',
            'COACH': 'trainer; large vehicle',
            'COAST': 'land near sea; move easily',
            'COULD': 'past tense of can; might',
            'COUNT': 'to number; calculate',
            'COURT': 'place of justice; playing area',
            'COVER': 'to place over; protect',
            'CRAFT': 'skill; handmade object',
            'CRASH': 'violent collision; failure',
            'CRAZY': 'insane; very enthusiastic',
            'CREAM': 'rich part of milk; pale yellow',
            'CRIME': 'illegal act; wrongdoing',
            'CROSS': 'to go across; angry',
            'CROWD': 'large group of people',
            'CROWN': 'head covering of royalty',
            'CURVE': 'bent line; bend smoothly',
            'CYCLE': 'series of events; bicycle',
            'DAILY': 'every day; routine',
            'DANCE': 'move rhythmically to music',
            'DEATH': 'end of life; dying',
            'DEBUT': 'first appearance; beginning',
            'DELAY': 'to postpone; late arrival',
            'DEPTH': 'distance down; profundity',
            'DOUBT': 'uncertainty; question',
            'DOZEN': 'group of twelve',
            'DRAFT': 'rough copy; current of air',
            'DRAMA': 'play; emotional situation',
            'DREAM': 'images during sleep; aspiration',
            'DRESS': 'woman\'s garment; to clothe',
            'DRINK': 'liquid for consuming; alcohol',
            'DRIVE': 'to operate vehicle; urge',
            'EARLY': 'before usual time; first',
            'EARTH': 'planet we live on; soil',
            'EIGHT': 'number 8; one more than seven',
            'EMPTY': 'containing nothing; void',
            'ENEMY': 'opponent; hostile force',
            'ENJOY': 'to take pleasure in',
            'ENTER': 'to go into; join',
            'ENTRY': 'way in; item in list',
            'EQUAL': 'same in value; fair',
            'ERROR': 'mistake; wrong action',
            'EVENT': 'something that happens',
            'EVERY': 'each one; all possible',
            'EXACT': 'precise; completely accurate',
            'EXIST': 'to be; have reality',
            'EXTRA': 'additional; more than usual',
            'FAITH': 'trust; religious belief',
            'FALSE': 'not true; artificial',
            'FAULT': 'mistake; defect',
            'FIELD': 'open area of land; area of study',
            'FIFTH': 'number 5 in order',
            'FIFTY': 'number 50; five tens',
            'FIGHT': 'to battle; struggle',
            'FINAL': 'last; concluding',
            'FIRST': 'coming before all others',
            'FIXED': 'not moving; repaired',
            'FLASH': 'sudden bright light; brief moment',
            'FLOOR': 'bottom of room; level of building',
            'FOCUS': 'center of attention; concentrate',
            'FORCE': 'strength; make someone do',
            'FORTH': 'forward; onward',
            'FORTY': 'number 40; four tens',
            'FOUND': 'discovered; established',
            'FRAME': 'border; structure',
            'FRESH': 'new; not stale',
            'FRONT': 'forward part; face',
            'FUNNY': 'amusing; strange',
            'GHOST': 'spirit of dead person',
            'GIANT': 'very large person; huge',
            'GIVEN': 'provided; specified',
            'GLASS': 'transparent material; drinking vessel',
            'GLOBE': 'sphere; model of earth',
            'GLORY': 'great honor; magnificence',
            'GRACE': 'elegance; divine favor',
            'GRADE': 'level; mark of quality',
            'GRAIN': 'seed of cereal; texture',
            'GRAND': 'magnificent; large',
            'GRANT': 'to give; money for project',
            'GRASS': 'green plants in lawn',
            'GRAVE': 'burial place; serious',
            'GREAT': 'very good; large',
            'GREEN': 'color of grass; inexperienced',
            'GROUP': 'collection of people or things',
            'GROWN': 'developed; adult',
            'GUARD': 'to protect; watchman',
            'GUESS': 'to estimate; suppose',
            'GUEST': 'visitor; person invited',
            'GUIDE': 'to lead; person who shows way',
            'HAPPY': 'feeling joy; pleased',
            'HARSH': 'rough; severe',
            'HEART': 'organ that pumps blood; center',
            'HEAVY': 'weighing much; serious',
            'HENCE': 'therefore; from now',
            'HORSE': 'large four-legged animal',
            'HOTEL': 'place providing lodging',
            'HOUSE': 'building for living; family',
            'HUMAN': 'relating to people; person',
            'IDEAL': 'perfect; model to copy',
            'IMAGE': 'picture; mental impression',
            'INDEX': 'list of contents; pointer',
            'INNER': 'inside; private',
            'INPUT': 'data put into system',
            'ISSUE': 'problem; topic for debate',
            'JAPAN': 'country in East Asia',
            'JOINT': 'where bones meet; shared',
            'JUDGE': 'person who decides in court',
            'KNIFE': 'cutting tool with blade',
            'KNOCK': 'to hit; rap on door',
            'KNOWN': 'familiar; recognized',
            'LABEL': 'tag with information',
            'LARGE': 'big in size; extensive',
            'LASER': 'beam of concentrated light',
            'LATER': 'at future time; after',
            'LAUGH': 'to express amusement',
            'LAYER': 'sheet; level',
            'LEARN': 'to gain knowledge; study',
            'LEASE': 'rental agreement; rent',
            'LEAST': 'smallest amount; minimum',
            'LEAVE': 'to go away; depart',
            'LEGAL': 'according to law; lawful',
            'LEVEL': 'height; degree; flat',
            'LIGHT': 'illumination; not heavy',
            'LIMIT': 'boundary; restriction',
            'LOCAL': 'nearby; of this place',
            'LOWER': 'further down; reduce',
            'LUCKY': 'having good fortune',
            'LUNCH': 'midday meal',
            'MAGIC': 'supernatural power; wonderful',
            'MAJOR': 'important; main',
            'MAKER': 'person who creates',
            'MARCH': 'third month; walk in step',
            'MATCH': 'game; to pair up',
            'MAYBE': 'perhaps; possibly',
            'MAYOR': 'head of city government',
            'MEANT': 'intended; past tense of mean',
            'MEDAL': 'award for achievement',
            'MEDIA': 'means of communication',
            'METAL': 'hard shiny material',
            'METER': 'unit of measurement',
            'MIGHT': 'strength; may possibly',
            'MINOR': 'small; less important',
            'MINUS': 'less; negative',
            'MIXED': 'combined; blended',
            'MODEL': 'small copy; example',
            'MONEY': 'currency; wealth',
            'MONTH': 'period of about 30 days',
            'MORAL': 'concerning right and wrong',
            'MOTOR': 'engine; machine that moves',
            'MOUNT': 'to climb; mountain',
            'MOUSE': 'small rodent; computer device',
            'MOUTH': 'opening for eating',
            'MOVED': 'changed position; emotionally affected',
            'MOVIE': 'film; motion picture',
            'MUSIC': 'organized sound; melody',
            'NEEDS': 'requirements; necessities',
            'NEVER': 'not ever; at no time',
            'NEWLY': 'recently; just now',
            'NIGHT': 'dark period; evening',
            'NOISE': 'sound; unwanted sound',
            'NORTH': 'direction opposite south',
            'NOTED': 'famous; observed',
            'NOVEL': 'book of fiction; new',
            'NURSE': 'medical care worker',
            'OCEAN': 'large body of salt water',
            'OFFER': 'to present; proposal',
            'OFTEN': 'frequently; many times',
            'ORDER': 'command; arrangement',
            'OTHER': 'different; additional',
            'OUGHT': 'should; moral obligation',
            'PAINT': 'colored liquid; to color',
            'PANEL': 'flat section; group of experts',
            'PAPER': 'material for writing; newspaper',
            'PARTY': 'celebration; political group',
            'PEACE': 'absence of war; calm',
            'PHASE': 'stage; period',
            'PHONE': 'telephone; to call',
            'PHOTO': 'photograph; picture',
            'PIANO': 'musical instrument with keys',
            'PIECE': 'part of whole; item',
            'PILOT': 'person who flies aircraft',
            'PITCH': 'throw; musical tone',
            'PLACE': 'location; to put',
            'PLAIN': 'simple; flat land',
            'PLANE': 'aircraft; flat surface',
            'PLANT': 'living organism; factory',
            'PLATE': 'dish for food; flat sheet',
            'POINT': 'sharp end; purpose',
            'POUND': 'unit of weight; to hit',
            'POWER': 'strength; energy',
            'PRESS': 'to push; news media',
            'PRICE': 'cost; value',
            'PRIDE': 'feeling of satisfaction',
            'PRIME': 'main; best quality',
            'PRINT': 'to produce text; published material',
            'PRIOR': 'earlier; previous',
            'PRIZE': 'reward; award',
            'PROOF': 'evidence; demonstration',
            'PROUD': 'feeling pride; satisfied',
            'PROVE': 'to demonstrate truth',
            'QUEEN': 'female monarch; card',
            'QUICK': 'fast; rapid',
            'QUIET': 'making little noise; calm',
            'QUITE': 'rather; completely',
            'RADIO': 'wireless communication device',
            'RAISE': 'to lift up; increase',
            'RANGE': 'extent; area',
            'RAPID': 'very fast; quick',
            'RATIO': 'relationship between numbers',
            'REACH': 'to extend to; arrive at',
            'READY': 'prepared; willing',
            'REALM': 'kingdom; area of activity',
            'REBEL': 'to resist authority; revolutionary',
            'REFER': 'to mention; direct attention',
            'RELAX': 'to rest; become less tense',
            'REPAY': 'to pay back; return favor',
            'REPLY': 'to answer; response',
            'RIGHT': 'correct; opposite of left',
            'RIGID': 'stiff; inflexible',
            'RIVAL': 'competitor; opponent',
            'RIVER': 'large natural stream',
            'ROBOT': 'mechanical person; automated machine',
            'ROCKY': 'full of rocks; unsteady',
            'ROMAN': 'of ancient Rome; upright letters',
            'ROUGH': 'not smooth; harsh',
            'ROUND': 'circular; series',
            'ROUTE': 'way; path',
            'ROYAL': 'of king or queen; magnificent',
            'RURAL': 'of the countryside; agricultural',
            'SCALE': 'size; to climb',
            'SCENE': 'place of action; view',
            'SCOPE': 'extent; range',
            'SCORE': 'points in game; twenty',
            'SENSE': 'feeling; meaning',
            'SERVE': 'to help; provide',
            'SETUP': 'arrangement; organization',
            'SEVEN': 'number 7; one more than six',
            'SHALL': 'will; must',
            'SHAPE': 'form; condition',
            'SHARE': 'to divide; portion',
            'SHARP': 'having cutting edge; keen',
            'SHEET': 'large piece of cloth; paper',
            'SHELF': 'horizontal board for storage',
            'SHELL': 'hard outer covering',
            'SHIFT': 'to move; change',
            'SHINE': 'to give light; polish',
            'SHIRT': 'upper body garment',
            'SHOCK': 'sudden surprise; impact',
            'SHOOT': 'to fire; photograph',
            'SHORT': 'not long; brief',
            'SHOWN': 'displayed; demonstrated',
            'SIGHT': 'vision; something seen',
            'SILLY': 'foolish; ridiculous',
            'SINCE': 'from then till now; because',
            'SIXTH': 'number 6 in order',
            'SIXTY': 'number 60; six tens',
            'SIZED': 'having particular size',
            'SKILL': 'ability; expertise',
            'SLEEP': 'rest with eyes closed',
            'SLIDE': 'to move smoothly; playground equipment',
            'SMALL': 'little; not big',
            'SMART': 'intelligent; clever',
            'SMILE': 'happy facial expression',
            'SMOKE': 'gas from fire; to use tobacco',
            'SNAKE': 'legless reptile',
            'SOLID': 'firm; not liquid',
            'SOLVE': 'to find answer; resolve',
            'SORRY': 'feeling regret; apologetic',
            'SOUND': 'noise; healthy',
            'SOUTH': 'direction opposite north',
            'SPACE': 'empty area; outer space',
            'SPARE': 'extra; to save',
            'SPEAK': 'to talk; use voice',
            'SPEED': 'rate of movement; quickness',
            'SPEND': 'to pay money; use time',
            'SPENT': 'used up; exhausted',
            'SPLIT': 'to divide; separate',
            'SPOKE': 'past tense of speak; wheel part',
            'SPORT': 'athletic game; fun',
            'STAFF': 'employees; stick',
            'STAGE': 'platform; phase',
            'STAKE': 'pointed stick; risk',
            'STAND': 'to be upright; booth',
            'START': 'to begin; beginning',
            'STATE': 'condition; government region',
            'STEAM': 'water vapor; energy',
            'STEEL': 'strong metal; determination',
            'STEEP': 'having sharp slope',
            'STICK': 'piece of wood; to adhere',
            'STILL': 'not moving; even now',
            'STOCK': 'supply; shares in company',
            'STONE': 'rock; hard material',
            'STOOD': 'past tense of stand',
            'STORE': 'shop; to keep',
            'STORM': 'violent weather; attack',
            'STORY': 'tale; floor of building',
            'STRIP': 'narrow piece; to remove',
            'STUCK': 'unable to move; fixed',
            'STUDY': 'to learn; research',
            'STUFF': 'material; things',
            'STYLE': 'manner; fashion',
            'SUGAR': 'sweet substance; sweetheart',
            'SUITE': 'set of rooms; matched set',
            'SUPER': 'excellent; above normal',
            'SWEET': 'having sugar taste; pleasant',
            'SWIFT': 'fast; rapid',
            'SWING': 'to move back and forth',
            'SWORD': 'weapon with long blade',
            'TABLE': 'furniture with flat top',
            'TAKEN': 'captured; seized',
            'TASTE': 'flavor; to try food',
            'TAXES': 'money paid to government',
            'TEACH': 'to instruct; show how',
            'TEAMS': 'groups working together',
            'TEETH': 'plural of tooth',
            'TEMPO': 'speed of music; pace',
            'TENDS': 'cares for; inclines toward',
            'TERMS': 'conditions; words',
            'TESTS': 'examinations; trials',
            'THANK': 'to express gratitude',
            'THEFT': 'act of stealing',
            'THEIR': 'belonging to them',
            'THEME': 'main idea; topic',
            'THERE': 'in that place; exists',
            'THESE': 'plural of this',
            'THICK': 'wide; dense',
            'THING': 'object; matter',
            'THINK': 'to use mind; consider',
            'THIRD': 'number 3 in order',
            'THOSE': 'plural of that',
            'THREE': 'number 3; one more than two',
            'THREW': 'past tense of throw',
            'THROW': 'to toss; hurl',
            'THUMB': 'short thick finger',
            'TIGHT': 'firmly fixed; close-fitting',
            'TIMER': 'device measuring time',
            'TIMES': 'occasions; periods',
            'TIRED': 'weary; exhausted',
            'TITLE': 'name; heading',
            'TODAY': 'this present day',
            'TOKEN': 'symbol; small payment',
            'TOTAL': 'complete amount; whole',
            'TOUCH': 'to feel; contact',
            'TOUGH': 'strong; difficult',
            'TOWER': 'tall narrow structure',
            'TRACK': 'path; to follow',
            'TRADE': 'business; to exchange',
            'TRAIN': 'series of cars; to teach',
            'TREAT': 'to handle; special pleasure',
            'TREND': 'general direction; fashion',
            'TRIAL': 'test; court case',
            'TRIBE': 'group of people; clan',
            'TRICK': 'clever act; to deceive',
            'TRIED': 'attempted; tested',
            'TRIES': 'attempts; efforts',
            'TRULY': 'really; genuinely',
            'TRUNK': 'tree stem; large box',
            'TRUST': 'confidence; to believe',
            'TRUTH': 'fact; reality',
            'TWICE': 'two times; double',
            'TWIST': 'to turn; change meaning',
            'TYPED': 'written on keyboard',
            'UNDER': 'below; beneath',
            'UNION': 'joining; workers\' organization',
            'UNITY': 'oneness; harmony',
            'UNTIL': 'up to time; before',
            'UPPER': 'higher; top',
            'UPSET': 'disturbed; to overturn',
            'URBAN': 'of the city',
            'USAGE': 'way of using; custom',
            'USUAL': 'normal; ordinary',
            'VALUE': 'worth; importance',
            'VIDEO': 'moving pictures; film',
            'VIRUS': 'tiny infectious agent',
            'VISIT': 'to go see; call on',
            'VITAL': 'essential; full of life',
            'VOCAL': 'relating to voice; outspoken',
            'VOICE': 'sound from throat; opinion',
            'WASTE': 'to use carelessly; garbage',
            'WATCH': 'to look at; timepiece',
            'WATER': 'liquid essential for life',
            'WHEEL': 'circular object that rotates',
            'WHERE': 'at what place; location',
            'WHICH': 'what one; that',
            'WHILE': 'during time; although',
            'WHITE': 'color of snow; pale',
            'WHOLE': 'complete; entire',
            'WHOSE': 'belonging to whom',
            'WOMAN': 'adult female human',
            'WOMEN': 'plural of woman',
            'WORLD': 'earth; universe',
            'WORRY': 'to be anxious; concern',
            'WORSE': 'more bad; inferior',
            'WORST': 'most bad; poorest quality',
            'WORTH': 'value; deserving',
            'WOULD': 'past of will; conditional',
            'WRITE': 'to form letters; compose',
            'WRONG': 'incorrect; not right',
            'WROTE': 'past tense of write',
            'YOUNG': 'not old; youthful',
            'YOUTH': 'young person; early life'
        };
        
        this.stats = this.loadStats();
        this.initializeGame();
        this.bindEvents();
    }
    
    initializeGame() {
        try {
            console.log('🔄 Initializing English Wordle game...');
            
            this.selectRandomWord();
            this.updateStatsDisplay();
            this.clearBoard();
            this.resetKeyboard();
            this.currentRow = 0;
            this.currentCol = 0;
            this.gameOver = false;
            this.guesses = [];
            
            // Hide completion elements (with safety checks)
            const gameComplete = document.getElementById('game-complete');
            const wordDefinition = document.getElementById('word-definition');
            
            if (gameComplete) gameComplete.style.display = 'none';
            if (wordDefinition) wordDefinition.style.display = 'none';
            
            console.log('✅ English Wordle game initialized successfully');
        } catch (error) {
            console.error('❌ Error in initializeGame:', error);
            this.showError('Failed to initialize game. Please refresh the page.');
        }
    }
    
    selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.wordList.length);
        this.targetWord = this.wordList[randomIndex];
        console.log('Target word:', this.targetWord); // For testing
    }
    
    bindEvents() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // On-screen keyboard
        document.querySelectorAll('.key').forEach(key => {
            key.addEventListener('click', () => {
                this.handleKeyPress({ key: key.dataset.key });
            });
        });
    }
    
    handleKeyPress(e) {
        if (this.gameOver) return;
        
        const key = e.key.toUpperCase();
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (key.match(/[A-Z]/) && key.length === 1) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentCol < 5) {
            const tile = this.getTile(this.currentRow, this.currentCol);
            tile.textContent = letter;
            tile.classList.add('filled');
            this.currentCol++;
        }
    }
    
    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const tile = this.getTile(this.currentRow, this.currentCol);
            tile.textContent = '';
            tile.classList.remove('filled');
        }
    }
    
    submitGuess() {
        if (this.currentCol !== 5) {
            this.showMessage('Not enough letters', 'error');
            return;
        }
        
        const guess = this.getCurrentGuess();
        
        if (!this.wordList.includes(guess)) {
            this.showMessage('Not in word list', 'error');
            return;
        }
        
        this.guesses.push(guess);
        this.evaluateGuess(guess);
        
        if (guess === this.targetWord) {
            this.gameWon();
        } else if (this.currentRow === 5) {
            this.gameLost();
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }
    }
    
    getCurrentGuess() {
        let guess = '';
        for (let col = 0; col < 5; col++) {
            const tile = this.getTile(this.currentRow, col);
            guess += tile.textContent;
        }
        return guess;
    }
    
    evaluateGuess(guess) {
        const targetLetters = this.targetWord.split('');
        const guessLetters = guess.split('');
        const result = Array(5).fill('absent');
        
        // Mark correct positions
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = 'correct';
                targetLetters[i] = null; // Mark as used
                guessLetters[i] = null;
            }
        }
        
        // Mark present letters
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] && targetLetters.includes(guessLetters[i])) {
                result[i] = 'present';
                targetLetters[targetLetters.indexOf(guessLetters[i])] = null;
            }
        }
        
        // Apply colors to tiles
        for (let col = 0; col < 5; col++) {
            const tile = this.getTile(this.currentRow, col);
            const letter = guess[col];
            
            setTimeout(() => {
                tile.classList.add(result[col]);
            }, col * 100);
            
            // Update keyboard
            this.updateKeyboard(letter, result[col]);
        }
    }
    
    updateKeyboard(letter, result) {
        const key = document.querySelector(`[data-key="${letter}"]`);
        if (!key) return;
        
        // Don't downgrade from correct to present/absent
        if (key.classList.contains('correct')) return;
        if (key.classList.contains('present') && result === 'absent') return;
        
        key.classList.remove('correct', 'present', 'absent');
        key.classList.add(result);
    }
    
    gameWon() {
        this.gameOver = true;
        this.stats.gamesPlayed++;
        this.stats.gamesWon++;
        this.stats.currentStreak++;
        this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
        this.saveStats();
        this.updateStatsDisplay();
        
        setTimeout(() => {
            this.showMessage('Excellent! 🎉', 'success');
            this.showGameComplete(true);
            this.showWordDefinition();
        }, 1000);
    }
    
    gameLost() {
        this.gameOver = true;
        this.stats.gamesPlayed++;
        this.stats.currentStreak = 0;
        this.saveStats();
        this.updateStatsDisplay();
        
        setTimeout(() => {
            this.showMessage(`The word was ${this.targetWord}`, 'error');
            this.showGameComplete(false);
            this.showWordDefinition();
        }, 1000);
    }
    
    async showGameComplete(won) {
        const completeDiv = document.getElementById('game-complete');
        const messageEl = document.getElementById('completion-message');
        const wordRevealEl = document.getElementById('word-reveal');
        
        // Check for Māori word bonuses
        let maoriWordBonus = 0;
        let totalMaoriWords = 0;
        
        if (window.maoriDictionaryAPI) {
            for (const guess of this.guesses) {
                const isMaori = await window.maoriDictionaryAPI.validateMaoriWord(guess);
                if (isMaori) {
                    totalMaoriWords++;
                    maoriWordBonus += 100; // Bonus for using Māori words
                }
            }
        }
        
        if (won) {
            let message = `Congratulations! You guessed it in ${this.currentRow + 1} tries!`;
            if (totalMaoriWords > 0) {
                message += ` 🌟 Māori Word Bonus: ${totalMaoriWords} words = +${maoriWordBonus} points!`;
            }
            messageEl.textContent = message;
        } else {
            let message = 'Better luck next time!';
            if (totalMaoriWords > 0) {
                message += ` 🌟 Māori Word Bonus: ${totalMaoriWords} words = +${maoriWordBonus} points for trying!`;
            }
            messageEl.textContent = message;
        }
        
        wordRevealEl.textContent = `The word was: ${this.targetWord}`;
        completeDiv.style.display = 'block';
        
        // Report to gamification system with Māori bonus
        if (window.reportGameCompletion) {
            const baseScore = won ? (500 + Math.max(0, (7 - (this.currentRow + 1)) * 100)) : 100;
            const finalScore = baseScore + maoriWordBonus;
            
            const result = window.reportGameCompletion(
                'english-wordle',
                finalScore,
                this.gameTime || 0,
                totalMaoriWords > 0, // Cultural bonus if any Māori words used
                0, // No hints in current version
                this.currentRow + 1, // Number of attempts
                won // Completion status
            );
            
            if (result && result.newAchievements && result.newAchievements.length > 0) {
                this.showAchievementNotification(result);
            }
        }
    }
    
    async showWordDefinition() {
        const definitionDiv = document.getElementById('word-definition');
        const definitionText = document.getElementById('definition-text');

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.targetWord}`);
            if (!response.ok) {
                throw new Error('Definition not found');
            }
            const data = await response.json();
            const definition = data[0]?.meanings[0]?.definitions[0]?.definition || 'Definition not available.';
            definitionText.innerHTML = `<strong>${this.targetWord}:</strong> ${definition}`;
        } catch (error) {
            console.error('Error fetching definition:', error);
            const definition = this.definitions[this.targetWord] || 'Definition not available.';
            definitionText.innerHTML = `<strong>${this.targetWord}:</strong> ${definition}`;
        } finally {
            definitionDiv.style.display = 'block';
        }
    }
    
    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type} show`;
        
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }
    
    getTile(row, col) {
        const rows = document.querySelectorAll('.row');
        const tiles = rows[row].querySelectorAll('.tile');
        return tiles[col];
    }
    
    clearBoard() {
        document.querySelectorAll('.tile').forEach(tile => {
            tile.textContent = '';
            tile.className = 'tile';
        });
    }
    
    resetKeyboard() {
        document.querySelectorAll('.key').forEach(key => {
            key.classList.remove('correct', 'present', 'absent');
        });
    }
    
    loadStats() {
        const saved = localStorage.getItem('englishWordleStats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            maxStreak: 0
        };
    }
    
    saveStats() {
        localStorage.setItem('englishWordleStats', JSON.stringify(this.stats));
    }
    
    updateStatsDisplay() {
        document.getElementById('games-played').textContent = this.stats.gamesPlayed;
        document.getElementById('win-rate').textContent = 
            this.stats.gamesPlayed > 0 ? 
            Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) : 0;
        document.getElementById('current-streak').textContent = this.stats.currentStreak;
        document.getElementById('max-streak').textContent = this.stats.maxStreak;
    }
    
    showError(message) {
        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = 'message error show';
        } else {
            // Fallback to console if no message element
            console.error('Game Error:', message);
        }
    }
}

// Global function for new game button
function newGame() {
    window.englishWordleGame.initializeGame();
}

// Initialize game when page loads with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🎮 Initializing English Wordle...');
        window.englishWordleGame = new EnglishWordleGame();
        console.log('✅ English Wordle initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing English Wordle:', error);
        // Show error message to user
        const gameArea = document.querySelector('.game-container');
        if (gameArea) {
            gameArea.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: red;">
                    <h2>Game Loading Error</h2>
                    <p>There was an error loading the English Wordle game.</p>
                    <button onclick="location.reload()" style="padding: 0.5rem 1rem; margin-top: 1rem;">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }
});