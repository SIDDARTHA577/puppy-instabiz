-- Seed initial puppies and happy families

-- PUPPIES (30)
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-max-male', 'Max', 'Maltipoo', 'Boy', '3 months', 'local', 'available', 'Price on inquiry', '#f2be6b', '0.36deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=3840&q=75', 'Meet Max: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-maltipoo-female', 'Korean Teacup Maltipoo', 'Maltipoo', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '-0.71deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-poodle-female', 'Korean Teacup Poodle', 'Poodle', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '-0.42deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Poodle: an adorable, healthy, and cheerful Poodle puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-cavapoo-male', 'Maltipoo &amp; Cavapoo', 'Maltipoo', 'Boy', '3 months Maltipoo &amp; 2 months Cavapoo', 'local', 'available', 'Price on inquiry', '#f2be6b', '-0.80deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=3840&q=75', 'Meet Maltipoo &amp; Cavapoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('toy-poodle-male-female', 'Toy Poodle', 'Poodle', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '1.81deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FvMu0BPvkAZ-j%2Fc65e53967d%2Fb942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg&w=3840&q=75', 'Meet Toy Poodle: an adorable, healthy, and cheerful Poodle puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-female-2', 'Maltipoo', 'Maltipoo', 'Girl', '3 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '2.12deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3WJNmn6VVgVu%2F732f779474%2Fb942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg&w=3840&q=75', 'Meet Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('pomeranian-female', 'Pomeranian', 'Pomeranian', 'Girl', '3 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '2.43deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3yOfnmoyPooH%2F81e0c7e00c%2Fb942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg&w=3840&q=75', 'Meet Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('copper-male', 'Copper', 'Cavapoo', 'Boy', '2 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '1.47deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FO-6w4FYqE10j%2Fbe76f399cc%2Fb942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg&w=3840&q=75', 'Meet Copper: an adorable, healthy, and cheerful Cavapoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('shitzu-female', 'Shih Tzu', 'Shih Tzu', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#f2be6b', '0.09deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FqNrTCSrsYyzY%2F168fa8c4ff%2Fb942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg&w=3840&q=75', 'Meet Shih Tzu: an adorable, healthy, and cheerful Shih Tzu puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('shitzu-male', 'Shih Tzu', 'Shih Tzu', 'Boy', '2 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '-0.61deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fcrgs9ih6as_M%2Fe37bafb1bf%2Fb942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg&w=3840&q=75', 'Meet Shih Tzu: an adorable, healthy, and cheerful Shih Tzu puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-female-1', 'Maltipoo', 'Maltipoo', 'Girl', '2.5 months', 'local', 'available', 'Price on inquiry', '#e8c39a', '1.07deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FwNm2_VIBEQvK%2F4b68f59e75%2Fb942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg&w=3840&q=75', 'Meet Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-female', 'Maltipoo', 'Maltipoo', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '-0.34deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FlMhASnmIIVQ4%2Fad2353ad31%2Fb942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg&w=3840&q=75', 'Meet Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-pomeranian-1', 'Korean Teacup Pomeranian', 'Pomeranian', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#f9cdbf', '2.24deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FEsAq2LSRvVCJ%2F4d553ed044%2Fb942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-pomeranian', 'Korean Teacup Pomeranian', 'Pomeranian', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#f9cdbf', '-1.80deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fvzf7P8SPCZ-Q%2Fa8db4ee114%2Fb942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-pomeranian-male', 'Korean Teacup Pomeranian', 'Pomeranian', 'Boy', '2 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '0.19deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FnZTGFv46hrZI%2Ffb9eeefc9c%2Fb942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-max-male-b2', 'Max', 'Maltipoo', 'Boy', '3 months', 'local', 'available', 'Price on inquiry', '#f2be6b', '0.36deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=3840&q=75', 'Meet Max: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-maltipoo-female-b2', 'Korean Teacup Maltipoo', 'Maltipoo', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '-0.71deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-poodle-female-b2', 'Korean Teacup Poodle', 'Poodle', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '-0.42deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Poodle: an adorable, healthy, and cheerful Poodle puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-cavapoo-male-b2', 'Maltipoo &amp; Cavapoo', 'Maltipoo', 'Boy', '3 months Maltipoo &amp; 2 months Cavapoo', 'local', 'available', 'Price on inquiry', '#f2be6b', '-0.80deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=3840&q=75', 'Meet Maltipoo &amp; Cavapoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('toy-poodle-male-female-b2', 'Toy Poodle', 'Poodle', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '1.81deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FvMu0BPvkAZ-j%2Fc65e53967d%2Fb942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg&w=3840&q=75', 'Meet Toy Poodle: an adorable, healthy, and cheerful Poodle puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-female-2-b2', 'Maltipoo', 'Maltipoo', 'Girl', '3 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '2.12deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3WJNmn6VVgVu%2F732f779474%2Fb942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg&w=3840&q=75', 'Meet Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('pomeranian-female-b2', 'Pomeranian', 'Pomeranian', 'Girl', '3 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '2.43deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3yOfnmoyPooH%2F81e0c7e00c%2Fb942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg&w=3840&q=75', 'Meet Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('copper-male-b2', 'Copper', 'Cavapoo', 'Boy', '2 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '1.47deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FO-6w4FYqE10j%2Fbe76f399cc%2Fb942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg&w=3840&q=75', 'Meet Copper: an adorable, healthy, and cheerful Cavapoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('shitzu-female-b2', 'Shih Tzu', 'Shih Tzu', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#f2be6b', '0.09deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FqNrTCSrsYyzY%2F168fa8c4ff%2Fb942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg&w=3840&q=75', 'Meet Shih Tzu: an adorable, healthy, and cheerful Shih Tzu puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('shitzu-male-b2', 'Shih Tzu', 'Shih Tzu', 'Boy', '2 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '-0.61deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fcrgs9ih6as_M%2Fe37bafb1bf%2Fb942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg&w=3840&q=75', 'Meet Shih Tzu: an adorable, healthy, and cheerful Shih Tzu puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-female-1-b2', 'Maltipoo', 'Maltipoo', 'Girl', '2.5 months', 'local', 'available', 'Price on inquiry', '#e8c39a', '1.07deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FwNm2_VIBEQvK%2F4b68f59e75%2Fb942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg&w=3840&q=75', 'Meet Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('maltipoo-female-b2', 'Maltipoo', 'Maltipoo', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#bfddf5', '-0.34deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FlMhASnmIIVQ4%2Fad2353ad31%2Fb942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg&w=3840&q=75', 'Meet Maltipoo: an adorable, healthy, and cheerful Maltipoo puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-pomeranian-1-b2', 'Korean Teacup Pomeranian', 'Pomeranian', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#f9cdbf', '2.24deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FEsAq2LSRvVCJ%2F4d553ed044%2Fb942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-pomeranian-b2', 'Korean Teacup Pomeranian', 'Pomeranian', 'Girl', '2 months', 'local', 'available', 'Price on inquiry', '#f9cdbf', '-1.80deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fvzf7P8SPCZ-Q%2Fa8db4ee114%2Fb942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;
INSERT INTO public.puppies (slug, name, breed, gender, age, location_type, status, price, wash, tilt, cover_image, description)
VALUES ('korean-teacup-pomeranian-male-b2', 'Korean Teacup Pomeranian', 'Pomeranian', 'Boy', '2 months', 'local', 'available', 'Price on inquiry', '#fbe3b4', '0.19deg', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FnZTGFv46hrZI%2Ffb9eeefc9c%2Fb942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg&w=3840&q=75', 'Meet Korean Teacup Pomeranian: an adorable, healthy, and cheerful Pomeranian puppy. Vaccinated, dewormed, and with full vet check documentation.')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  breed = EXCLUDED.breed,
  gender = EXCLUDED.gender,
  age = EXCLUDED.age,
  location_type = EXCLUDED.location_type,
  cover_image = EXCLUDED.cover_image;

-- HAPPY FAMILIES (64)
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #1', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FTUslu26Ueaq-%2F9c3516c040%2Fedb2f5_6627857aca7e495ea37d9f62d814d323-mv2.jpeg&w=3840&q=75', '', '', '-2.2deg', '#f6d79a', '2026', true, 1);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #2', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FOcgEePeBmGuu%2F41fb22320b%2Fedb2f5_adf88f7400c848249d60698fca0336e9-mv2.jpeg&w=3840&q=75', '', '', '1.6deg', '#f9cdbf', '2026', true, 2);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #3', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FRYkyuv4DBCTC%2Fd9e02a0dc8%2Fedb2f5_7ed2ee1ba89b4230b52f5e3981b1b198-mv2.jpeg&w=3840&q=75', '', '', '-0.9deg', '#cfe5f6', '2026', true, 3);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #4', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fd267R4d3lMSv%2F96d8604ca3%2Fedb2f5_02b95a69a2c24c7e81b60e6d8c01baf7-mv2.jpeg&w=3840&q=75', '', '', '2.4deg', '#f6d79a', '2026', true, 4);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #5', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FXqxhmNftVKic%2F5adf2f28fe%2Fedb2f5_37f5218f73e842b88ee3ae0c911bcafa-mv2.jpeg&w=3840&q=75', '', '', '-1.5deg', '#e9dcc4', '2026', true, 5);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #6', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F1II_yVrwWdOG%2Fc07a8ef9f1%2Fedb2f5_258010c661f64f3b8b952c5a2f7677de-mv2.jpeg&w=3840&q=75', '', '', '0.8deg', '#f6d79a', '2026', true, 6);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #7', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FbKP7vwN0R2OU%2F1aa47534b5%2Fedb2f5_b8d76dffb97f46b5a9f2aaf9c1067b4b-mv2.jpeg&w=3840&q=75', '', '', '-2.6deg', '#f9cdbf', '2026', false, 7);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #8', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FToVkYw_K3UrY%2F81a2bd9ac1%2Fedb2f5_582a3767e5eb408f9684a7e623229dc4-mv2.jpeg&w=3840&q=75', '', '', '1.2deg', '#cfe5f6', '2026', false, 8);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #9', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FstDfO2jMfvb_%2F6228a11db2%2Fedb2f5_4b08003ef57c4663b55c9ac0c4147c36-mv2.jpeg&w=3840&q=75', '', '', '-2.2deg', '#f6d79a', '2026', false, 9);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #10', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FK-U7RwW9j2A9%2F09d7edc058%2Fedb2f5_22d3cc4ae0e14216a0d3a1ec9796649f-mv2.jpeg&w=3840&q=75', '', '', '1.6deg', '#e9dcc4', '2026', false, 10);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #11', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fs23WYu0qJQ_h%2Fd0ad444e50%2F27b888_a887dbff51fb420d95774cce6a8d54fb-mv2.jpg&w=3840&q=75', '', '', '-0.9deg', '#f6d79a', '2026', false, 11);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #12', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fab5hEGUKO4aY%2Fde923fd8eb%2Fedb2f5_d5177ed7ae1344d7acc11e9770df7b74-mv2.jpeg&w=3840&q=75', '', '', '2.4deg', '#f9cdbf', '2026', false, 12);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #13', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FyEfM9sdMluCX%2F46ecd570ef%2Fedb2f5_099acc542ba14359aa8c0f933cb4ef2c-mv2.jpeg&w=3840&q=75', '', '', '-1.5deg', '#cfe5f6', '2026', false, 13);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #14', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F_41LE-nBf847%2F2ea8e152eb%2F27b888_76aa3ad05faf40bd8eb2a6d826737525-mv2.jpg&w=3840&q=75', '', '', '0.8deg', '#f6d79a', '2026', false, 14);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #15', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Ftuarxe-C9j5H%2F913026dd39%2F27b888_b22e1ced7da74ea7a14a68474d8c2dc0-mv2.jpg&w=3840&q=75', '', '', '-2.6deg', '#e9dcc4', '2026', false, 15);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #16', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FUuJqjsRN-wKL%2F047b245604%2Fb942a5_a1ead54bc6934e5ab953e98d4aa0312d-mv2.jpg&w=3840&q=75', '', '', '1.2deg', '#f6d79a', '2026', false, 16);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #17', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FqZ5mPGpLO-G9%2F1d4c092a1e%2F27b888_4af83a5cffb44045bcab615b0cbc237c-mv2.jpg&w=3840&q=75', '', '', '-2.2deg', '#f9cdbf', '2026', false, 17);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #18', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxHEMhVTwflC_%2F8859dd626c%2Fb942a5_65113182432144f49bd50bb009e7d88c-mv2.jpg&w=3840&q=75', '', '', '1.6deg', '#cfe5f6', '2026', false, 18);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #19', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FQYUwdroeZC35%2F52e467dddb%2Fb942a5_03ab53e8167c454eaf75e37491e51b03-mv2.jpg&w=3840&q=75', '', '', '-0.9deg', '#f6d79a', '2026', false, 19);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #20', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FrZE7ypWUH0wz%2F3ccfc972cd%2F27b888_d8c90ec444654b9c964dc2527814ceaf-mv2.jpg&w=3840&q=75', '', '', '2.4deg', '#e9dcc4', '2026', false, 20);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #21', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FSg8iy_EOrJah%2F684699406d%2F27b888_3594e056bf964a7a839a1bd5ac0c859e-mv2.jpg&w=3840&q=75', '', '', '-1.5deg', '#f6d79a', '2026', false, 21);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #22', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FCVsVLsnCV0L3%2F626d9c9855%2F27b888_522e394293a845bcae93adec46bf499c-mv2.jpg&w=3840&q=75', '', '', '0.8deg', '#f9cdbf', '2026', false, 22);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #23', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F1ziQH1fmyl-k%2F6193c5fa7f%2F27b888_d76b636e082842139943ca9fece80632-mv2.jpg&w=3840&q=75', '', '', '-2.6deg', '#cfe5f6', '2026', false, 23);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #24', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F2BoSaeBhLer8%2F05c9d02f5a%2F27b888_48694c17ac634f32b63bcd21052c10c3-mv2.jpg&w=3840&q=75', '', '', '1.2deg', '#f6d79a', '2026', false, 24);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #25', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FQLO4DWvoWlJY%2F7ccb7aae32%2F27b888_13d2747a7f454379a5670b552690f728-mv2.jpg&w=3840&q=75', '', '', '-2.2deg', '#e9dcc4', '2026', false, 25);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #26', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxaIi_2gMoj_N%2F27123a3e2c%2F27b888_3375199e717a4f6ca02e902672664e79-mv2.jpg&w=3840&q=75', '', '', '1.6deg', '#f6d79a', '2026', false, 26);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #27', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FGyAYtgNRGHUw%2F379090aed6%2F27b888_3f1463156de645feb90bf306b2572b76-mv2.jpg&w=3840&q=75', '', '', '-0.9deg', '#f9cdbf', '2026', false, 27);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #28', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FNCnzIyNwzZiC%2F11eddf4e8e%2F27b888_f405d17027174cdfa4437b9b1d84eaa2-mv2.jpg&w=3840&q=75', '', '', '2.4deg', '#cfe5f6', '2026', false, 28);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #29', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F2RCKCPAW7oIk%2F31af5cd06d%2F27b888_9b40a22ad84e4e8cbf625acab1bc8e4f-mv2.jpg&w=3840&q=75', '', '', '-1.5deg', '#f6d79a', '2026', false, 29);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #30', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fd9RWhCKfRHOc%2Fc549944174%2F27b888_0ad908eb6ba745b7b3e1426338af1803-mv2.jpg&w=3840&q=75', '', '', '0.8deg', '#e9dcc4', '2026', false, 30);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #31', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FtI7E08CB-sVp%2Fb655581264%2F27b888_a649f91c871046d2a4231ceda00ec982-mv2.jpg&w=3840&q=75', '', '', '-2.6deg', '#f6d79a', '2026', false, 31);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #32', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FuL-D7uBZjs12%2F3cc9e2690e%2F27b888_96b9eb6428164f41b124137673bc865c-mv2.jpg&w=3840&q=75', '', '', '1.2deg', '#f9cdbf', '2026', false, 32);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #33', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FAK4nDMw3v53a%2F9ded532913%2F27b888_89af9713331443c3b9f4b72a83d646e3-mv2.jpg&w=3840&q=75', '', '', '-2.2deg', '#cfe5f6', '2026', false, 33);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #34', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FSXZSpIZJimpQ%2F0a488a56a5%2F27b888_927dffc200a44f9dafcb953b765beec0-mv2.jpg&w=3840&q=75', '', '', '1.6deg', '#f6d79a', '2026', false, 34);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #35', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FNBeJ3y_g-Iee%2Fa4a5827b07%2F27b888_bba195dd5eec46e798d3dc05790f1e99-mv2.jpg&w=3840&q=75', '', '', '-0.9deg', '#e9dcc4', '2026', false, 35);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #36', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F6Abv8pfqHoEA%2Fa6fb93823b%2F27b888_ff288b45f9694416b3f3d019d7a9a1d4-mv2.jpg&w=3840&q=75', '', '', '2.4deg', '#f6d79a', '2026', false, 36);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #37', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FUFzHrheMHQmi%2F7ce45654d8%2F27b888_ade4298d721a444888379393d06745cb-mv2.jpg&w=3840&q=75', '', '', '-1.5deg', '#f9cdbf', '2026', false, 37);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #38', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F937wIvKxefpy%2Fa42f072027%2F27b888_664db706809c46eea8e75db06885de6a-mv2.jpg&w=3840&q=75', '', '', '0.8deg', '#cfe5f6', '2026', false, 38);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #39', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FBxM75hECdt9p%2Feb17b83cc8%2F27b888_659cfe02524541e0ab0a94cc71a2a189-mv2.jpg&w=3840&q=75', '', '', '-2.6deg', '#f6d79a', '2026', false, 39);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #40', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FO88qTc2s7KH8%2F032fd55fa2%2F27b888_da4b7d60a604414e95bfb91efcdad6f6-mv2.jpg&w=3840&q=75', '', '', '1.2deg', '#e9dcc4', '2026', false, 40);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #41', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FPAAMBTTfmXOK%2F37d59d6ee3%2F27b888_dad1db0c47834985a25b98b067cf563e-mv2.jpg&w=3840&q=75', '', '', '-2.2deg', '#f6d79a', '2026', false, 41);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #42', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F9A74-QBbi78w%2Fd788ec6f31%2F27b888_96324661ab4742649af7d72ba465f0a8-mv2.jpg&w=3840&q=75', '', '', '1.6deg', '#f9cdbf', '2026', false, 42);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #43', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F0wEBefsp1F5j%2F1b67ab78e0%2F27b888_8727fecbf89b4648b443b9bfab83fffd-mv2.jpg&w=3840&q=75', '', '', '-0.9deg', '#cfe5f6', '2026', false, 43);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #44', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fhu2K_kmYs7s9%2F0e8b423b7c%2F27b888_b5a504249d254ac7a02693ba340c74fb-mv2.jpg&w=3840&q=75', '', '', '2.4deg', '#f6d79a', '2026', false, 44);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #45', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FLpUvbTEyekwN%2F556d16df42%2F27b888_74e15c47a77b48a39e5174d2657bc417-mv2.jpg&w=3840&q=75', '', '', '-1.5deg', '#e9dcc4', '2026', false, 45);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Lulu 🧸 with her new mummy ❤️', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FdI8Jv0KRTiLJ%2Fd2d7e5375b%2F27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg&w=3840&q=75', '', '', '0.8deg', '#f6d79a', '2026', false, 46);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Adorable Maltipoo baby 🧸❤️', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FTI-WtaFssfQt%2Fc41fb2a387%2F27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg&w=3840&q=75', '', '', '-2.6deg', '#f9cdbf', '2026', false, 47);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('My new teddy puppy 🥰🧸', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fj6T9eswP2eS8%2F59c6879a1d%2F27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg&w=3840&q=75', '', '', '1.2deg', '#cfe5f6', '2026', false, 48);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Our new puppies 🧸🥰🤗', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FHJgL4rRnmReV%2F533701358f%2F27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg&w=3840&q=75', '', '', '-2.2deg', '#f6d79a', '2026', false, 49);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('New puppy 🧸😍', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fuc5ANs5jm7r7%2F7160d8b7b1%2F27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg&w=3840&q=75', '', '', '1.6deg', '#e9dcc4', '2026', false, 50);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Gang of 3 😍🧸', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FpRJubyqHw8p7%2Fd58c4c07ee%2F27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg&w=3840&q=75', '', '', '-0.9deg', '#f6d79a', '2026', false, 51);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('So happy 😍😍', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F4wOJk9azop_-%2F65ecf66bf0%2F27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg&w=3840&q=75', '', '', '2.4deg', '#f9cdbf', '2026', false, 52);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #53', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F2ZpD4FCAriYZ%2F56ea196e78%2F27b888_160a7ee974d74fc7ae452afc6e5fccea-mv2.jpg&w=3840&q=75', '', '', '-1.5deg', '#cfe5f6', '2026', false, 53);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #54', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FBarQuR6VS6XX%2F3acd4e6449%2F27b888_2255683016304a278b17353cb21c1f45-mv2.jpg&w=3840&q=75', '', '', '0.8deg', '#f6d79a', '2026', false, 54);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #55', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fl_M8IYdzFJHb%2Fbc8ad2f58f%2F27b888_80b7b3c14907460f8dc1457ffd99a99d-mv2.jpg&w=3840&q=75', '', '', '-2.6deg', '#e9dcc4', '2026', false, 55);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #56', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FaAf69e7YtFrb%2Fe162c491b3%2F27b888_f18596e1a72543d695d79416569bef23-mv2.jpg&w=3840&q=75', '', '', '1.2deg', '#f6d79a', '2026', false, 56);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #57', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FqesMnrX7cliq%2Fda5bec6e86%2F27b888_3def48865368404392a98437a48e6ec7-mv2.jpg&w=3840&q=75', '', '', '-2.2deg', '#f9cdbf', '2026', false, 57);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #58', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FsqPa3JOR3OPc%2F4273c20214%2F27b888_62c31ea0db1f452a8ca28369aef45c8d-mv2.jpg&w=3840&q=75', '', '', '1.6deg', '#cfe5f6', '2026', false, 58);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('New pup 🤗💫', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3h20rIasJCOa%2F10c307cb1c%2F27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpg&w=3840&q=75', '', '', '-0.9deg', '#f6d79a', '2026', false, 59);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #60', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FNaV9L3-u1vss%2Fcb3d13765a%2F27b888_91d95c12076a4efd94128b14dceb216f-mv2.avif&w=3840&q=75', '', '', '2.4deg', '#e9dcc4', '2026', false, 60);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #61', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FEINH5_Xbws14%2Fdae797ecdf%2F27b888_202b27e8ecca4b4d8715c8f648bd35e4-mv2.avif&w=3840&q=75', '', '', '-1.5deg', '#f6d79a', '2026', false, 61);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #62', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FwyDhW6yEQ6ef%2Fe012615aab%2Fb942a5_9381a9a0ca3e40b4b4f31906cf7fda56-mv2.png&w=3840&q=75', '', '', '0.8deg', '#f9cdbf', '2026', false, 62);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #63', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fn6BJMOg_-QYI%2F82329c84b0%2Fb942a5_dc4082b7b0454025bcef4c790c4f4e68-mv2.jpg&w=3840&q=75', '', '', '-2.6deg', '#cfe5f6', '2026', false, 63);
INSERT INTO public.happy_families (client_name, location, story, image_url, puppy_name, breed, tilt, tape, date, is_featured, display_order)
VALUES ('Happy Family #64', 'Dubai, UAE', '', 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FnTiIYDlSaIjG%2F334a39f6a3%2F27b888_febae47e079240d28d1602b54813dca4-mv2.avif&w=3840&q=75', '', '', '1.2deg', '#f6d79a', '2026', false, 64);
