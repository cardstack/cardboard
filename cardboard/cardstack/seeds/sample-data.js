const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {
  factory.addResource('boards', 'community').withAttributes({
    title: 'Community'
  }).withRelated('articles', [
    { type: 'articles', id: '1'},
    { type: 'articles', id: 'algodiversity-decentralized-algorithmic-governance'},
    { type: 'articles', id: 'ten-reasons-love-cardstack'},
    { type: 'articles', id: 'token-vesting-contract'},
    { type: 'articles', id: 'decentralized-software'},
    { type: 'articles', id: 'what-is-cardstack-hub'},
    { type: 'articles', id: 'cardstack-dot-bc'},
    { type: 'articles', id: 'four-ways-to-improve'},
    { type: 'articles', id: 'data-privacy-blockchain'},
    { type: 'articles', id: 'healthy-software-ecosystem'},
    { type: 'articles', id: 'tally-protocol'},
    { type: 'articles', id: 'experience-layer'},
  ]);

  factory.addResource('categories', 'snowboarding').withAttributes({ name: 'Snowboarding' });
  factory.addResource('categories', 'developers').withAttributes({ name: 'Developers' });
  factory.addResource('categories', 'community').withAttributes({ name: 'Community' });
  factory.addResource('categories', 'crypto').withAttributes({ name: 'Cryptocurrency' });

  factory.addResource('cardstack-images', 'snowboarding-image').withRelated('file', { type: 'cardstack-files', id: 'snowboarding' });
  factory.addResource('cardstack-images', 'algodiversity-image').withRelated('file', { type: 'cardstack-files', id: 'algodiversity' });
  factory.addResource('cardstack-images', 'community-adecentralizedsoftware-image').withRelated('file', { type: 'cardstack-files', id: 'community-adecentralizedsoftware' });
  factory.addResource('cardstack-images', 'community-blockchainfortherealworld-image').withRelated('file', { type: 'cardstack-files', id: 'community-blockchainfortherealworld' });
  factory.addResource('cardstack-images', 'community-breakingdownthesiliconvalley-image').withRelated('file', { type: 'cardstack-files', id: 'community-breakingdownthesiliconvalley' });
  factory.addResource('cardstack-images', 'community-cardstackanddotbc-image').withRelated('file', { type: 'cardstack-files', id: 'community-cardstackanddotbc' });
  factory.addResource('cardstack-images', 'community-fourwaystoimprove-image').withRelated('file', { type: 'cardstack-files', id: 'community-fourwaystoimprove' });
  factory.addResource('cardstack-images', 'community-interviewanalysisinchains-image').withRelated('file', { type: 'cardstack-files', id: 'community-interviewanalysisinchains' });
  factory.addResource('cardstack-images', 'data-privacy-blockchain-image').withRelated('file', { type: 'cardstack-files', id: 'data-privacy-blockchain' });
  factory.addResource('cardstack-images', 'developer-cardstacktodevelop-image').withRelated('file', { type: 'cardstack-files', id: 'developer-cardstacktodevelop' });
  factory.addResource('cardstack-images', 'developer-composabledesign-image').withRelated('file', { type: 'cardstack-files', id: 'developer-composabledesign' });
  factory.addResource('cardstack-images', 'developer-datadrivenalgorithms-image').withRelated('file', { type: 'cardstack-files', id: 'developer-datadrivenalgorithms' });
  factory.addResource('cardstack-images', 'developer-thetallyprotocol-image').withRelated('file', { type: 'cardstack-files', id: 'developer-thetallyprotocol' });
  factory.addResource('cardstack-images', 'developer-usingpostgresql-image').withRelated('file', { type: 'cardstack-files', id: 'developer-usingpostgresql' });
  factory.addResource('cardstack-images', 'developer-whatisthecardstackhub-image').withRelated('file', { type: 'cardstack-files', id: 'developer-whatisthecardstackhub' });
  factory.addResource('cardstack-images', 'feature-blockchainbeyond-image').withRelated('file', { type: 'cardstack-files', id: 'feature-blockchainbeyond' });
  factory.addResource('cardstack-images', 'feature-contract-upgrade-image').withRelated('file', { type: 'cardstack-files', id: 'feature-contract-upgrade' });
  factory.addResource('cardstack-images', 'feature-growingahealthy-image').withRelated('file', { type: 'cardstack-files', id: 'feature-growingahealthy' });
  factory.addResource('cardstack-images', 'feature-progressivedecentralization-image').withRelated('file', { type: 'cardstack-files', id: 'feature-progressivedecentralization' });
  factory.addResource('cardstack-images', 'nasdaq-backincontrol-image').withRelated('file', { type: 'cardstack-files', id: 'nasdaq-backincontrol' });
  factory.addResource('cardstack-images', 'running-ethereum-image').withRelated('file', { type: 'cardstack-files', id: 'running-ethereum' });
  factory.addResource('cardstack-images', 'speculation-image').withRelated('file', { type: 'cardstack-files', id: 'speculation' });
  factory.addResource('cardstack-images', 'ten-reasons-image').withRelated('file', { type: 'cardstack-files', id: 'ten-reasons' });
  factory.addResource('cardstack-images', 'token-buildingatokenvesting-image').withRelated('file', { type: 'cardstack-files', id: 'token-buildingatokenvesting' });
  factory.addResource('cardstack-images', 'token-cardstacksupgradablesmart-image').withRelated('file', { type: 'cardstack-files', id: 'token-cardstacksupgradablesmart' });
  factory.addResource('cardstack-images', 'token-scalablepaymentpools-image').withRelated('file', { type: 'cardstack-files', id: 'token-scalablepaymentpools' });
  factory.addResource('cardstack-images', 'token-whitepapereconomics-image').withRelated('file', { type: 'cardstack-files', id: 'token-whitepapereconomics' });
  factory.addResource('cardstack-images', 'token-whythecryptomarket-image').withRelated('file', { type: 'cardstack-files', id: 'token-whythecryptomarket' });
  factory.addResource('cardstack-images', 'community-interviewwhatistheexperience-image').withRelated('file', { type: 'cardstack-files', id: 'community-interviewwhatistheexperience' });


  factory.addResource('articles', '1').withAttributes({
    slug: 'demo',
    title: 'Snow Fever: Ultimate Fun for Snowboarders, Skiers and all Winter Enthusiasts',
    description: 'Secret vacation location: Enjoy some peace and quiet, have fun and be one with nature.',
    body: {
      'atoms': [],
      'cards': [],
      'markups': [],
      'version': '0.3.1',
      'sections': [
        [1, 'h2', [[0, [], 0, 'Secret vacation location: Enjoy some peace and quiet, have fun and be one with nature.']]],
        [1, 'p', [[0, [], 0, '“I see nothing but the sky above me, the clouds below me, and masses of snow in between… I’m on top of the world!” says Tim Snowfreak, former winner of the Snowboarding in Strange Places World Championship, amazed at his surroundings as if this were his first day in these high, snow-covered mountains.']]],
        [1, 'p', [[0, [], 0, 'The wondrous backdrop of white summits in the still winter air has fascinated sports enthusiasts for years. In fact, even though nobody really knows where this hidden place is to be found, there are people who claim that snowboarding was invented in this very location. Legend says, several decades ago, a particularly inventive man linked a pair of skis together to create a surfboard-like contraption. Combining the ideas of snow and surfing, he basically built a snurfboard that became extremely famous very soon. Within weeks, snurfers all over the world began to manufacture their own snurfing equipment and found their way here to glide down the (until that point) untouched mountains in the snow. There may not have been slopes or lifts or anything but snow, but people truly loved this place. This is where all the craziness allegedly began—in the snow desert that is nowhere to be found.']]],
        [1, 'p', [[0, [], 0, 'Combining the ideas of snow and surfing, he basically built a snurfboard that became extremely famous very soon. Within weeks, snurfers all over the world began to manufacture their own snurfing equipment and found their way here to glide down the (until that point) untouched mountains in the snow.']]],
        [1, 'p', [[0, [], 0, 'There may not have been slopes or lifts or anything but snow, but people truly loved this place. This is where all the craziness allegedly began—in the snow desert that is nowhere to be found.']]],
        [1, 'p', [[0, [], 0, 'Yet, much has changed since then. These days, the hidden mountains offer one or two sort-of-well-prepared slopes, one lonely little hut, and an actual chairlift too! Granted, it is a lift without a safety bar, but you’ve got hands, right? Just find something, anything, to hold on to during the ride and you’ll probably be just fine.']]],
        [1, 'blockquote', [[0, [], 0, '“I see nothing but the sky above me, the clouds below me, and masses of snow in between… I’m on top of the world!”']]],
        [1, 'p', [[0, [], 0, 'The good news is: While this slightly questionable chairlift may not be able to save your life, it does open before sunrise, which allows both snowboarders and skiers (we’re all friends here) to hit the slope early in the morning.']]],
        [1, 'p', [[0, [], 0, 'Plus, there is plenty more fun to be had. These mountains offer a natural toboggan run that leads from the top of the mountain through the woods all the way down to the valley. Be sure to try it out, but it is highly recommended that you wear snow goggles and extremely resilient snow boots; otherwise, you will very likely find yourself drenched, frozen and unable to walk or see for at least two hours after you’ve finally crossed the finish line, preferably in one piece.']]],
        [1, 'p', [[0, [], 0, 'Snow tubing is a fabulous alternative for everyone who has always wanted to see what floating tires are capable of outside their natural habitat. You can even go night skiing or snowboarding, if you don’t mind the lack of light, as the concept of floodlit pistes has, unfortunately, not reached this little neck of the woods just yet. However, riding down the mountain in the moonlight certainly has its charm for night owls who can’t get enough of the pleasures of winter sports. And if all of these options are too adventurous for your taste, this place features a unique hiking trail through the amazingly idyllic winter landscape, along which you may even see some bears.']]],
        [1, 'p', [[0, [], 0, 'As for sleeping arrangements, the mountain’s lonely little hut usually has a couple rooms available. In case it doesn’t, you can always build an igloo. They are actually warmer than you would think. If they weren’t, how would business models like igloo hotels—where, so they claim, you don’t freeze to death while you sleep—be able to survive? But if you don’t like igloos, you can go for a nice mountain cave too, though you may have to share it with some carnivorous animals. And if you’re lucky, you can even find a cave that looks like the ice queen’s palace—enjoy some pretty snow art before bed and feel like Elsa for a day! ']]],
        [1, 'h2', [[0, [], 0, 'The Alps: Enjoy the sun, the drinks, the spa, and maybe do some snowboarding as well.']]],
        [1, 'p', [[0, [], 0, 'As you carve your way through the Alps, there are marvelous attractions to enjoy. The most significant highlights are naturally the slopes themselves. Imagine perfectly prepared pistes you can run down like a pro, framed by the softest and brightest deep powder snow, where both skiers and snowboarders can get their money’s worth and all their dreams fulfilled. Provided that the winter sporting adventure has been scheduled conveniently. Ideally, you pick a week where every normal person has to work and you’re the only lucky genius who gets to play in the snow. Alternatively, if you play your cards right, you may be able to befriend the owner of the ski lifts. Or you get creative in some other way, to ensure that nobody besides you and your friends will stand “in line” when the first cable car opens at 9 a.m. Whichever way you go about it, if you actually manage to secure the entire skiing and snowboarding region for yourself, you’ve done everything right. You’ve made it. You’ve figured out the mystery of skiing in the Alps. Why? Because of one single, extremely crucial fact: There will be no skiers standing or lying around the slopes, because they thought they could ski without actually knowing how to ski. And there will be no excruciatingly annoying snowboarders either, who are sitting around in a row in the middle of the slope—the most appropriate place imaginable—because they’re too lazy to get back up and keep doing what they came here to do.']]],
        [1, 'p', [[0, [], 0, 'But there is another attraction unique to the Alps, which makes the experience of doing winter sports in the midst of incapable skiers and inconsiderate snowboarders slightly more bearable, if not actually fun. In fact, it provides a great exit strategy—quite literally. It’s made of wood, it has a roof, and it serves drinks. It’s called a ski hut. Or a mountain hut. Or simply hut. Sometimes a cabin.']]],
        [1, 'p', [[0, [], 0, 'Really, you can call it whatever you like. The point is that many huts on the mountains offer fantastic sun terraces, which are a godsend once the temperatures rise a bit. When the winter starts turning into spring, you no longer have to stop by a hut just to keep your feet from turning into ice (by the way, if you press them up against the tiled stove, they will burn). You can actually stop by the hut for fun! Sit down outside in the warmth, wearing your snow boots combined with sunglasses rather than snow goggles, and enjoy the scenery, as the amazing blanket of white reflects the glittering sunlight.']]],
        [1, 'p', [[0, [], 0, 'You should know, however, that there is absolutely no way you will get back on the slopes once you have sat down on one of those mountaintop terraces. Especially once music starts playing and you feel like you have found the one place in the world where you want to live forever. Or until you eventually turn into the Iceman, also known around the world as “the frozen mummy”.']]],
        [1, 'p', [[0, [], 0, 'Though it may be counterintuitive—sometimes, between hut visits, it can be fun to actually get on the board and ride down the slopes too. At least until you hit the next hut, which is typically about 50 meters away. Now, here is an important piece of information: You’re not really supposed to ski or snowboard after you have had a schnapps (or ten); there are huts that offer to bring you back to your hotel by snowcat if you’ve drunk your way through the entire bar by order of après-ski. By the way, as a side note: The huts serve food as well. Mostly apple strudel and schnitzel and fries. If you’re lucky, they even have something nutritious too—like sausages.']]],
        [1, 'p', [[0, [], 0, 'At least as essential as the Alpine sun terraces, après ski and, for some people, the skiing / snowboarding part of the holiday, is the wellness oasis awaiting tourists at every single hotel. So, once you’ve made it back down to the valley, make sure you put on your bathrobe, slippers, and relax for a little while before you go to dinner and fall asleep on the table.']]],
        [1, 'h2', [[0, [], 0, 'North Pole: If it’s still there by the time you arrive, you are welcome to stay!']]],
        [1, 'p', [[0, [], 0, 'This place is like Disneyworld for snow lovers. Being an island of pure fun, it offers adventures for winter fans in every shape and form. There are fun parks everywhere, featuring obstacles, jumps, bumps, turns and kickers for all skill levels, from beginners to pseudo-pros to actual athletes. And off-piste in the powder, you can make your freestyle dreams come true!']]],
        [1, 'p', [[0, [], 0, 'Plus, there are snowboard coasters, snowboard ghost trains, snowboard tunnels, slalom courses, racetracks, half pipes and even some loops! Yes, they have indeed managed to build a loop for snowboarders; and not just any loop, but a double loop and a triple loop. It may be good to mention that, so far, nobody has felt the desire to try it out, as it looks slightly lethal, but it’s there.']]],
        [1, 'p', [[0, [], 0, 'So you’re welcome to be the first to hit the loop! You’ll definitely have a ton of fun showing off in front of everyone who’s too chicken to try. There’s a photo point too, which will gladly take a picture of your success (or lack thereof) and post it immediately on all social media channels with your name and an appropriate hashtag attached.']]],
        [1, 'p', [[0, [], 0, 'For snow enthusiasts with less masochistic tendencies, this place offers the fabulous alternative option of sledding or, for car freaks, riding on a snowcat. When you ask very very nicely, a driver may let you sit on the passenger seat and help him prepare the slopes for the next day, which is a delightful experience you will never forget. “Helping prepare the slopes you get to carve down in the morning is something I can only recommend to anyone who is curious about snow, snowboarding and everything related to it”, says Sara Boarding, a 27-year-old snowboarder who holidays here every season. ']]],
        [1, 'p', [[0, [], 0, 'Of course, this unique vacationing spot has even more to offer than adrenaline pumps and mountain tractors. It boasts the most spectacular slopes known to man: Endlessly wide and endlessly long runs, which are prepared right in front of you as you carve your way downwards, ensuring that the snow is always in pristine condition. Furthermore, the lifts have all the perks you can imagine: heated seats, champagne, red carpet, orchestra… You’ll never want to leave!']]],
        [1, 'p', [[0, [], 0, 'Once you’re tired of all the snowboarding, skiing, snowcat driving, looping and fun parks, you’re welcome to leave the action behind and calm down a little bit further outside the excitement-focused center of the North Pole. Take a walk through the valley, past the ice, through the snow, as you watch penguins and polar bears fight it out for dominance over who gets which of the poles. Walk underneath snow-covered trees, past frozen lakes, through the perfect quietude of this untouched natural miracle—while you’re ideally holding the hand of your sweetheart, as this is romance at its finest. And since the place is shrinking away, there’s not much danger of you getting lost; unless you end up on an ice shell that carries you off, but that’s highly unlikely.']]],
        [1, 'p', [[0, [], 0, 'After such a memorable vacation, it is always nice to think of the poor people whom you left behind before you leave this magical island. That is why the whole village is filled with numerous tourist shops with lovely products on display, most of which you can purchase. Take a stroll through the main shopping street and choose between the countless, extremely tasteful and not at all tacky souvenirs like wooden figurines or plates with embroideries. Alternatively, you could bring some cheese you’ve made yourself in the course of a “This is how we make cheese”-tour through a dairy, or toys that are supposedly made by elves. And for a personal note, you can take advantage of the many photo points around this all-year skiing and snowboarding area to take the joy of snowboarding back home with you.']]]
      ]
    }
  }).withRelated('category', { type: 'categories', id: 'snowboarding' })
    .withRelated('cover-image', { type: 'cardstack-images', id: 'snowboarding-image' })
    .withRelated('theme', { type: 'themes', id: 'sharp' })
    .withRelated('author', { type: 'github-users', id: 'cardstack-team' });

    const article = {
      'atoms': [],
      'cards': [],
      'markups': [['strong']],
      'version': '0.3.1',
      'sections': [[1, 'p', [[0, [], 0, 'In an interview with podcast Bad Crypto, Cardstack director Chris Tse spoke about the community the Cardstack Project aims to create, and how he hopes to attract the diverse kinds of developers, designers, and other talent that will be needed to make the ecosystem successful.']]], [1, 'p', [[0, [], 0, 'Here are four reasons you should build using Cardstack and become a part of the Cardstack community, no matter what your background or blockchain expertise level.']]], [1, 'h2', [[0, [0], 1, '1. Let the Hub do the heavy lifting']]], [1, 'p', [[0, [], 0, 'Right now if you’re a developer, you have to make a decision — day one — about which path you’re going to take with a project — web, peer-to-peer, mobile, etc.']]], [1, 'p', [[0, [], 0, 'If you choose the Web, you’ll have to figure out how to monetize, through fees or advertising. If you choose peer-to-peer, you’ll probably have to navigate the enormously complicated undertaking of creating your own token, figuring out smart contracts, and much more.']]], [1, 'p', [[0, [], 0, 'For someone who just wants to code like they’re used to without signing their life away to the blockchain quite yet, that sure is a lot to ask.']]], [1, 'p', [[0, [], 0, 'Because Cardstack, as a framework, allows you to deploy in a peer-to-peer or hosted way, a developer can easily dip their toe into decentralization using Cardstack’s open source toolkit. The idea is that with enough developers and designers using Cardstack as a user interface onramp, we’ll have a true decentralized software ecosystem.']]], [1, 'p', [[0, [], 0, 'Chris explained:']]], [1, 'blockquote', [[0, [], 0, '“Cardstack provides a framework that has a plug-in system; each plug-in connects to each blockchain of decentralized protocol. It can even connect to the cloud, existing UI or existing cloud services. On top of that, developers, don’t need to be blockchain developers, just great, motivated, application developers who used do web and iOS development now say, Hey, I have a Cardstack framework. It’s like other frameworks I’ve used, and look — I’m doing blockchain application on top of the plug-in framework without having to learn the quirkiness of how decentralized applications are working today.']]], [1, 'blockquote', [[0, [], 0, '“There’s no way for those software developers, design firms, and product firms to get into crypto because they have to go way low-level, go into Ethereum and build solidity, which is not really what they do. They build beautiful apps that people find useful and they love.”']]], [1, 'h2', [[0, [], 0, '2. Rewrite the playbook']]], [1, 'p', [[0, [], 0, 'The exciting challenge in blockchain development right now is figuring out how to create a user experience that matches or exceeds the offerings from Silicon Valley superpowers. Whoever cracks this puzzle will set the standards for the decentralized Internet of the future.']]], [1, 'p', [[0, [], 0, 'By contributing to Cardstack, Chris says you’ll be an integral part of the trailblazing:']]], [1, 'blockquote', [[0, [], 0, '“The way we make technology easy is we bring developers, product designers and user interface experts and say, “Why don’t you build me a beautiful UI, a component, a module, a tab, an app or what we call “carts,” a block of information that allows you to visualize what is actually going on, on-chain, and then coordinate them?”']]]]
    };

    factory.addResource('articles', 'algodiversity-decentralized-algorithmic-governance')
      .withAttributes({
        slug: 'algodiversity-decentralized-algorithmic-governance',
        title: 'Algodiversity: Toward Fair Decentralized Governance',
        description: 'When our lives are governed by powerful algorithms, we need to fight back on the same level',
        publishedDate: '2018-05-08T10:00:00',
        body: { 'atoms': [], 'cards': [], 'markups': [['strong']], 'version': '0.3.1', 'sections': [[1, 'p', [[0, [], 0, 'Governance consists of rules, judgment calls, and action. On the Internet, your digital life is increasingly governed by algorithms — a script or program that follows instructions to make judgment calls across a variety of situations, and then respond with some kind of action in each instance.In our networked world, algorithms have increasing influence over the distribution of information and wealth. Often these algorithms will sit between two parties, but only one party will have control over the algorithm — or even know how it works.When you are in this kind of asymmetric relationship, it has economic consequences. You are reduced to praying that you will be “blessed by the algorithm.”']]]] }
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'algodiversity-image' })
      .withRelated('category', { type: 'categories', id: 'developers' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'from-speculation-to-utility')
      .withAttributes({
        slug: 'from-speculation-to-utility',
        title: 'From Speculation to Utility',
        description: 'A blueprint for mass market adoption of decentralized apps',
        publishedDate: '2018-08-30T10:00:00',
        body: article
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'speculation-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'ten-reasons-love-cardstack')
      .withAttributes({
        slug: 'ten-reasons-love-cardstack',
        title: 'Ten Reasons to Love Cardstack',
        description: 'Why you should support the Cardstack Project',
        publishedDate: '2018-05-30T10:00:00',
        body: article
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'ten-reasons-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'what-is-cardstack-hub')
      .withAttributes({
        slug: 'what-is-cardstack-hub',
        title: 'What is the Cardstack Hub?',
        description: 'The Hub lets apps easily handle multiple data sources across the blockchain and the cloud',
        publishedDate: '2018-07-16T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'developer-whatisthecardstackhub-image' })
      .withRelated('category', { type: 'categories', id: 'developers' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'ed-faulkner' });


      factory.addResource('articles', 'using-postgresql')
      .withAttributes({
        slug: 'using-postgresql',
        title: 'Using PostgreSQL to Index and Query Blockchain Data',
        description: 'Improving the latency and consistency of indexing and querying on- and off-chain data',
        publishedDate: '2018-06-19T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'developer-usingpostgresql-image' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('category', { type: 'categories', id: 'developers' });

      factory.addResource('articles', 'tally-protocol')
      .withAttributes({
        slug: 'tally-protocol',
        title: 'The Tally Protocol: Scaling Ethereum with Untapped GPU Power',
        description: 'We don’t need new hardware. Just a smarter approach',
        publishedDate: '2018-03-18T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'developer-thetallyprotocol-image' })
      .withRelated('category', { type: 'categories', id: 'developers' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });


      factory.addResource('articles', 'composable-design')
      .withAttributes({
        slug: 'composable-design',
        title: 'Composable Design with Card UI',
        description: 'Card UI means you can mix and match apps from the cloud and decentralized Internet',
        publishedDate: '2018-07-19T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'developer-composabledesign-image' })
      .withRelated('category', { type: 'categories', id: 'developers' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'cardstack-team' });


      factory.addResource('articles', 'running-ethereum')
      .withAttributes({
        slug: 'running-ethereum',
        title: 'Running an Ethereum Cardstack Hub Application',
        description: 'How to run a Cardstack Hub against your smart contract',
        publishedDate: '2018-08-29T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'running-ethereum-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'hassan-abdel-rahman' });


      factory.addResource('articles', 'upgradable-smart-contracts-solidity')
      .withAttributes({
        slug: 'upgradable-smart-contracts-solidity',
        title: 'Upgradable Smart Contracts in Solidity',
        description: 'Solving the riddle of how to improve immutable Ethereum code',
        publishedDate: '2018-01-29T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'token-cardstacksupgradablesmart-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'hassan-abdel-rahman' });

      factory.addResource('articles', 'scalable-payment-pools-solidity')
      .withAttributes({
        slug: 'scalable-payment-pools-solidity',
        title: 'Scalable Payment Pools in Solidity',
        description: 'Paying a lot of people without paying a lot of gas',
        publishedDate: '2018-01-30T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'token-scalablepaymentpools-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'hassan-abdel-rahman' });

      factory.addResource('articles', 'token-vesting-contract')
      .withAttributes({
        slug: 'token-vesting-contract',
        title: 'Building a Token Vesting Contract',
        description: 'How to maintain long-term relationships with members of your token ecosystem',
        publishedDate: '2018-03-01T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'token-buildingatokenvesting-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'hassan-abdel-rahman' });

      factory.addResource('articles', 'crypto-market-volatile')
      .withAttributes({
        slug: 'crypto-market-volatile',
        title: 'Why the Crypto Market is Volatile',
        description: 'If we want prices to stabilize, we better get building',
        publishedDate: '2018-02-06T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'token-whythecryptomarket-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'white-paper-economics')
      .withAttributes({
        slug: 'white-paper-economics',
        title: 'White Paper: Economics',
        description: 'How open-sourced software development can be fueled by a token-backed economy',
        publishedDate: '2017-11-01T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'token-whitepapereconomics-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'dark' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'cardstack-electron-app')
      .withAttributes({
        slug: 'cardstack-electron-app',
        title: 'Cardstack to Develop Electron App',
        description: 'Enabling Cardstack to run on a local environment, and quickly deploy to the cloud',
        publishedDate: '2017-06-22T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'developer-cardstacktodevelop-image' })
      .withRelated('category', { type: 'categories', id: 'developers' })
      .withRelated('theme', { type: 'themes', id: 'dark' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'data-driven-algorithms')
      .withAttributes({
        slug: 'data-driven-algorithms',
        title: 'Data-driven Algorithms for dApps',
        description: 'How to get beyond the limitations of the Ethereum Virtual Machine',
        publishedDate: '2018-02-09T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'developer-datadrivenalgorithms-image' })
      .withRelated('category', { type: 'categories', id: 'developers' })
      .withRelated('theme', { type: 'themes', id: 'dark' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'blockchain-real-world')
      .withAttributes({
        slug: 'blockchain-real-world',
        title: 'Blockchain for the Real World',
        description: 'Chris shares thoughts about progressive decentralization at Beyond Blocks Tokyo',
        publishedDate: '2018-04-25T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'community-blockchainfortherealworld-image' })
      .withRelated('theme', { type: 'themes', id: 'dark' })
      .withRelated('category', { type: 'categories', id: 'community' });

      factory.addResource('articles', 'experience-layer')
      .withAttributes({
        slug: 'experience-layer',
        title: 'Interview: What is the \'Experience Layer\'?',
        description: 'Chris joins the hosts of the Bad Crypto podcast to explain how Cardstack is the missing piece of the decentralized Internet',
        publishedDate: '2018-05-17T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'community-interviewwhatistheexperience-image' })
      .withRelated('category', { type: 'categories', id: 'community' })
      .withRelated('theme', { type: 'themes', id: 'sharp' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'decentralized-software')
      .withAttributes({
        slug: 'decentralized-software',
        title: 'A Decentralized Software Ecosystem for Everyone',
        description: 'Why Cardstack is a game changer for developers',
        publishedDate: '2018-05-26T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'community-adecentralizedsoftware-image' })
      .withRelated('category', { type: 'categories', id: 'community' })
      .withRelated('theme', { type: 'themes', id: 'sharp' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'four-ways-to-improve')
      .withAttributes({
        slug: 'four-ways-to-improve',
        title: 'Four Ways to Improve the Decentralized Internet',
        description: 'Cardstack’s plan to create a better user experience for blockchain',
        publishedDate: '2018-05-29T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'community-fourwaystoimprove-image' })
      .withRelated('category', { type: 'categories', id: 'community' })
      .withRelated('theme', { type: 'themes', id: 'sharp' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'silicon-valley-silo')
      .withAttributes({
        slug: 'silicon-valley-silo',
        title: 'Breaking Down the Silicon Valley Silo',
        description: 'Why interdisciplinary collaboration is the future of blockchain',
        publishedDate: '2018-05-25T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'community-breakingdownthesiliconvalley-image' })
      .withRelated('category', { type: 'categories', id: 'community' })
      .withRelated('theme', { type: 'themes', id: 'sharp' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'analysis-in-chains')
      .withAttributes({
        slug: 'analysis-in-chains',
        title: 'Interview: Analysis in Chains with Chris Tse',
        description: 'Chris explains the Cardstack Framework and how it benefits developers',
        publishedDate: '2018-05-27T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'community-interviewanalysisinchains-image' })
      .withRelated('category', { type: 'categories', id: 'community' })
      .withRelated('theme', { type: 'themes', id: 'sharp' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'zeppelinos-contract-upgrade')
      .withAttributes({
        slug: 'zeppelinos-contract-upgrade',
        title: 'Cardstack Adopts ZeppelinOS to Grow Token Ecosystem',
        description: 'ZeppelinOS is adopted in our second smart contract upgrade',
        publishedDate: '2018-09-10T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'feature-contract-upgrade-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'sharp' })
      .withRelated('author', { type: 'github-users', id: 'cardstack-team' });

      factory.addResource('articles', 'healthy-software-ecosystem')
      .withAttributes({
        slug: 'healthy-software-ecosystem',
        title: 'Growing a Healthy Software Ecosystem',
        description: 'Lead Developer Ed Faulkner explains Cardstack’s journey to mass adoption',
        publishedDate: '2018-08-10T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'feature-growingahealthy-image' })
      .withRelated('category', { type: 'categories', id: 'community' })
      .withRelated('theme', { type: 'themes', id: 'sharp' })
      .withRelated('author', { type: 'github-users', id: 'ed-faulkner' });

      factory.addResource('articles', 'blockchain-beyond')
      .withAttributes({
        slug: 'blockchain-beyond',
        title: 'Blockchain Beyond Transactions',
        description: 'How to decentralize algorithmic decision making',
        publishedDate: '2018-02-09T10:00:00',
        body: article,
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'feature-blockchainbeyond-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'ed-faulkner' });

      // External Content

      factory.addResource('articles', 'cardstack-dot-bc')
      .withAttributes({
        slug: 'cardstack-dot-bc',
        title: 'Cardstack and DotBC to Tackle Music Rights',
        description: 'A partnership to solve the inefficiencies in music and media metadata storage',
        publishedDate: '2018-06-02T10:00:00'
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'community-cardstackanddotbc-image' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('category', { type: 'categories', id: 'community' });

      factory.addResource('articles', 'progressive-decentralization')
      .withAttributes({
        slug: 'progressive-decentralization',
        title: 'Progressive Decentralization Is the Key to Mass Adoption',
        description: 'Chris Tse writes for Nasdaq',
        publishedDate: '2018-06-28T10:00:00'
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'feature-progressivedecentralization-image' })
      .withRelated('category', { type: 'categories', id: 'community' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'data-privacy-blockchain')
      .withAttributes({
        slug: 'data-privacy-blockchain',
        title: 'How to Fight Poor Data Privacy with Blockchain Apps',
        publishedDate: '2018-04-18T10:00:00',
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'data-privacy-blockchain-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });

      factory.addResource('articles', 'blockchain-users-control-data')
      .withAttributes({
        slug: 'blockchain-users-control-data',
        title: 'How Blockchain Puts Users Back in Control of Their Data',
        publishedDate: '2018-04-16T10:00:00'
      })
      .withRelated('cover-image', { type: 'cardstack-images', id: 'nasdaq-backincontrol-image' })
      .withRelated('category', { type: 'categories', id: 'crypto' })
      .withRelated('theme', { type: 'themes', id: 'modern' })
      .withRelated('author', { type: 'github-users', id: 'chris-tse' });
    }

    module.exports = factory.getModels();
