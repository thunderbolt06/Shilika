-- =====================================================================
-- Seed: Shilika as the default author for all blog posts.
-- ---------------------------------------------------------------------

insert into authors (slug, name, title, bio, image_url, url, same_as)
values (
  'shilika-jain',
  'Shilika Jain',
  'Fractional PR Manager for Web3 & AI Founders',
  'Six years placing Web3 and AI founders into Tier-1 publications including Forbes, CoinDesk, Cointelegraph, Decrypt, The Block, Blockworks and AI Magazine. Currently leading APAC PR & partnerships at Myosin, a growth-marketing DAO.',
  'https://www.shilikajain.com/assets/shilika-portrait-1080.jpg',
  'https://www.shilikajain.com/authors/shilika-jain',
  array[
    'https://www.linkedin.com/in/shilika/',
    'https://x.com/Shilika_jain',
    'https://cryptodaily.co.uk/author/ShilikaJain',
    'https://calendly.com/shilikajain/30min/',
    'https://t.me/shilika3'
  ]
)
on conflict (slug) do update
  set name = excluded.name,
      title = excluded.title,
      bio = excluded.bio,
      image_url = excluded.image_url,
      url = excluded.url,
      same_as = excluded.same_as;
