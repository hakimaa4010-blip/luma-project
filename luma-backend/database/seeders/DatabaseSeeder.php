<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@luma.com'],
            [
                'name' => 'Admin Luma',
                'password' => bcrypt('admin123'),
                'phone' => '+212600000001',
                'role' => 'admin',
            ]
        );

        // 2. Create Client User
        User::updateOrCreate(
            ['email' => 'client@luma.com'],
            [
                'name' => 'Amine Benjelloun',
                'password' => bcrypt('client123'),
                'phone' => '+212611223344',
                'role' => 'client',
            ]
        );

        // 3. Create Categories
        $catRobes = Category::updateOrCreate(
            ['slug' => 'robes-d-exception'],
            [
                'name' => "Robes d'Exception",
                'image' => 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1000&auto=format&fit=crop',
                'gender' => 'women',
                'is_active' => true,
            ]
        );

        $catManteaux = Category::updateOrCreate(
            ['slug' => 'manteaux-en-laine'],
            [
                'name' => 'Manteaux en Laine',
                'image' => 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&auto=format&fit=crop&q=90',
                'gender' => 'women',
                'is_active' => true,
            ]
        );

        $catAccs = Category::updateOrCreate(
            ['slug' => 'sacs-accessoires'],
            [
                'name' => 'Sacs & Accessoires',
                'image' => 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
                'gender' => 'women',
                'is_active' => true,
            ]
        );

        $catKids = Category::updateOrCreate(
            ['slug' => 'costumes-enfant'],
            [
                'name' => 'Costumes Enfant',
                'image' => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=90',
                'gender' => 'kids',
                'is_active' => true,
            ]
        );

        $catEnsemblesKids = Category::updateOrCreate(
            ['slug' => 'ensembles-epures'],
            [
                'name' => 'Ensembles Épurés',
                'image' => 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop',
                'gender' => 'kids',
                'is_active' => true,
            ]
        );

        $catKidsAccs = Category::updateOrCreate(
            ['slug' => 'chaussures-accessoires-enfant'],
            [
                'name' => 'Chaussures & Accessoires',
                'image' => 'https://images.unsplash.com/photo-1519242220831-09410926fbff?q=80&w=1000&auto=format&fit=crop',
                'gender' => 'kids',
                'is_active' => true,
            ]
        );

        // 4. Seed Products
        $sizes = ['S', 'M', 'L'];
        $kidsSizes = ['4 ans', '6 ans', '8 ans'];

        // --- PRODUCT 1: Robe Longue en Soie Noire (Women) ---
        $p1 = Product::updateOrCreate(
            ['slug' => 'robe-longue-en-soie-noire'],
            [
                'category_id' => $catRobes->id,
                'name' => 'Robe Longue en Soie Noire',
                'description' => 'Une élégante robe longue fluide en soie naturelle noire, conçue pour les soirées les plus raffinées. Col drapé élégant et fente latérale subtile.',
                'price' => 4200.00,
                'sale_price' => 3900.00,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p1->id, 'image_path' => 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        foreach ($sizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p1->id, 'size' => $size, 'color' => 'Noir'],
                [
                    'color_hex' => '#000000',
                    'stock' => 15 + ($idx * 5),
                    'sku' => 'RLS-NOIR-' . $size,
                ]
            );
        }

        // --- PRODUCT 2: Manteau Ceinturé en Cachemire Blanc (Women) ---
        $p2 = Product::updateOrCreate(
            ['slug' => 'manteau-ceinture-en-cachemire-blanc'],
            [
                'category_id' => $catManteaux->id,
                'name' => 'Manteau Ceinturé en Cachemire Blanc',
                'description' => 'Manteau d\'hiver ceinturé, confectionné en laine mérinos et cachemire haut de gamme. Coupe moderne, confortable et d\'une douceur inégalée.',
                'price' => 6800.00,
                'sale_price' => null,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p2->id, 'image_path' => 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        foreach ($sizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p2->id, 'size' => $size, 'color' => 'Blanc Crème'],
                [
                    'color_hex' => '#FFFDD0',
                    'stock' => 5 + ($idx * 3),
                    'sku' => 'MCC-BLANC-' . $size,
                ]
            );
        }

        // --- PRODUCT 3: Sac à Main Classique en Cuir Fauve (Women) ---
        $p3 = Product::updateOrCreate(
            ['slug' => 'sac-a-main-classique-en-cuir-fauve'],
            [
                'category_id' => $catAccs->id,
                'name' => 'Sac à Main Classique en Cuir Fauve',
                'description' => 'Sac en cuir véritable de haute qualité, tannage végétal, orné de fermoirs dorés brossés signature de la maison LUMA.',
                'price' => 3500.00,
                'sale_price' => null,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => false,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p3->id, 'image_path' => 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        ProductVariant::updateOrCreate(
            ['product_id' => $p3->id, 'size' => 'Taille Unique', 'color' => 'Fauve'],
            [
                'color_hex' => '#A0522D',
                'stock' => 25,
                'sku' => 'SAC-FAUVE-UNIQ',
            ]
        );

        // --- PRODUCT 4: Robe de Soirée Plissée Émeraude (Women) ---
        $p5 = Product::updateOrCreate(
            ['slug' => 'robe-de-soiree-plissee-emeraude'],
            [
                'category_id' => $catRobes->id,
                'name' => 'Robe de Soirée Plissée Émeraude',
                'description' => 'Robe somptueuse plissée soleil en mousseline de soie émeraude. Coupe cintrée flatteuse avec un dos nu discret très élégant.',
                'price' => 4800.00,
                'sale_price' => null,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p5->id, 'image_path' => 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        foreach ($sizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p5->id, 'size' => $size, 'color' => 'Vert Émeraude'],
                [
                    'color_hex' => '#004B49',
                    'stock' => 8 + ($idx * 4),
                    'sku' => 'RPE-VERT-' . $size,
                ]
            );
        }

        // --- PRODUCT 5: Manteau Double Face en Alpaga (Women) ---
        $p6 = Product::updateOrCreate(
            ['slug' => 'manteau-double-face-en-alpaga'],
            [
                'category_id' => $catManteaux->id,
                'name' => 'Manteau Double Face en Alpaga',
                'description' => 'Manteau luxueux non doublé, cousu main, en pure laine d\'alpaga. Teinte camel intemporelle pour un tombé lâche chic.',
                'price' => 7200.00,
                'sale_price' => 6900.00,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p6->id, 'image_path' => 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        foreach ($sizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p6->id, 'size' => $size, 'color' => 'Camel'],
                [
                    'color_hex' => '#C19A6B',
                    'stock' => 4 + ($idx * 2),
                    'sku' => 'MDF-CAMEL-' . $size,
                ]
            );
        }

        // --- PRODUCT 6: Pochette Enveloppe en Cuir Grainé (Women) ---
        $p7 = Product::updateOrCreate(
            ['slug' => 'pochette-enveloppe-en-cuir-graine'],
            [
                'category_id' => $catAccs->id,
                'name' => 'Pochette Enveloppe en Cuir Grainé',
                'description' => 'Pochette d\'exception pour le soir en cuir de veau grainé noir. Détails en laiton doré et bandoulière amovible.',
                'price' => 2900.00,
                'sale_price' => null,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => false,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p7->id, 'image_path' => 'https://images.unsplash.com/photo-1566150905458-1bf1fc15aeb9?w=1000&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        ProductVariant::updateOrCreate(
            ['product_id' => $p7->id, 'size' => 'Taille Unique', 'color' => 'Noir'],
            [
                'color_hex' => '#000000',
                'stock' => 12,
                'sku' => 'PECG-NOIR-UNIQ',
            ]
        );

        // --- PRODUCT 7: Abaya Drapée en Soie d'Atelier (Women) ---
        $p_abaya = Product::updateOrCreate(
            ['slug' => 'abaya-drapee-en-soie-d-atelier'],
            [
                'category_id' => $catRobes->id,
                'name' => 'Abaya Drapée en Soie d\'Atelier',
                'description' => 'Une réinterprétation moderne et couture de l\'abaya traditionnelle. Entièrement réalisée en crêpe de soie pure avec des broderies artisanales discrètes faites à la main dans notre atelier à Fès.',
                'price' => 5400.00,
                'sale_price' => null,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_abaya->id, 'image_path' => 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        foreach ($sizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p_abaya->id, 'size' => $size, 'color' => 'Noir d\'Orient'],
                [
                    'color_hex' => '#1C1C1C',
                    'stock' => 6 + ($idx * 3),
                    'sku' => 'ABY-SOIE-' . $size,
                ]
            );
        }

        // --- PRODUCT 8: Trench-Coat Fluide Beige Sable (Women) ---
        $p_trench = Product::updateOrCreate(
            ['slug' => 'trench-coat-fluide-beige-sable'],
            [
                'category_id' => $catManteaux->id,
                'name' => 'Trench-Coat Fluide Beige Sable',
                'description' => 'Trench-coat à la coupe décontractée et fluide, idéal pour l\'intersaison. Confectionné en gabardine de coton haut de gamme, fini avec de grands boutons en corne.',
                'price' => 5800.00,
                'sale_price' => 5200.00,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_trench->id, 'image_path' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        foreach ($sizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p_trench->id, 'size' => $size, 'color' => 'Beige Sable'],
                [
                    'color_hex' => '#E1C699',
                    'stock' => 10 + ($idx * 2),
                    'sku' => 'TRC-BEIGE-' . $size,
                ]
            );
        }

        // --- PRODUCT 9: Robe Drapée de Soirée Champagne (Women) ---
        $p_robe_champagne = Product::updateOrCreate(
            ['slug' => 'robe-drapee-de-soiree-champagne'],
            [
                'category_id' => $catRobes->id,
                'name' => 'Robe Drapée de Soirée Champagne',
                'description' => 'Un classique intemporel pour vos cérémonies. Robe asymétrique en satin lourd de couleur champagne, avec un drapé architectural qui sublime la démarche.',
                'price' => 4900.00,
                'sale_price' => null,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_robe_champagne->id, 'image_path' => 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        foreach ($sizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p_robe_champagne->id, 'size' => $size, 'color' => 'Champagne'],
                [
                    'color_hex' => '#F4E0C8',
                    'stock' => 7 + ($idx * 2),
                    'sku' => 'RDS-CHAMP-' . $size,
                ]
            );
        }

        // --- PRODUCT 10: Sac Cabas Signature en Cuir Suédé (Women) ---
        $p_sac_suede = Product::updateOrCreate(
            ['slug' => 'sac-cabas-signature-en-cuir-suede'],
            [
                'category_id' => $catAccs->id,
                'name' => 'Sac Cabas Signature en Cuir Suédé',
                'description' => 'Cabas généreux et souple en cuir suédé haut de gamme couleur terre cuite. L\'accessoire minimaliste idéal pour allier chic et utilité au quotidien.',
                'price' => 3900.00,
                'sale_price' => null,
                'gender' => 'women',
                'is_active' => true,
                'is_featured' => false,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_sac_suede->id, 'image_path' => 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        ProductVariant::updateOrCreate(
            ['product_id' => $p_sac_suede->id, 'size' => 'Taille Unique', 'color' => 'Miel Suédé'],
            [
                'color_hex' => '#C68E5F',
                'stock' => 15,
                'sku' => 'CAB-SUEDE-UNIQ',
            ]
        );


        // --- PRODUCT 11: Robe en Coton Bio - Ligne Enfant (Kids) ---
        $p4 = Product::updateOrCreate(
            ['slug' => 'robe-en-coton-bio-ligne-enfant'],
            [
                'category_id' => $catKids->id,
                'name' => 'Robe en Coton Bio - Ligne Enfant',
                'description' => 'Petite robe légère en coton biologique certifié pour le confort suprême des tout-petits. Idéale pour les grandes occasions.',
                'price' => 1200.00,
                'sale_price' => 990.00,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p4->id, 'image_path' => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        foreach ($kidsSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p4->id, 'size' => $size, 'color' => 'Crème'],
                [
                    'color_hex' => '#F5F5DC',
                    'stock' => 10 + ($idx * 2),
                    'sku' => 'RCE-CREME-' . Str::slug($size),
                ]
            );
        }

        // --- PRODUCT 12: Costume Trois Pièces en Lin Enfant (Kids) ---
        $p8 = Product::updateOrCreate(
            ['slug' => 'costume-trois-pieces-en-lin-enfant'],
            [
                'category_id' => $catKids->id,
                'name' => 'Costume Trois Pièces en Lin Enfant',
                'description' => 'Un magnifique costume élégant composé d\'un gilet, d\'un short et d\'une chemise en lin pur. Parfait pour les mariages et cérémonies d\'été.',
                'price' => 1800.00,
                'sale_price' => null,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p8->id, 'image_path' => 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1000&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        foreach ($kidsSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p8->id, 'size' => $size, 'color' => 'Beige Sable'],
                [
                    'color_hex' => '#D2B48C',
                    'stock' => 6 + ($idx * 3),
                    'sku' => 'CPL-BEIGE-' . Str::slug($size),
                ]
            );
        }

        // --- PRODUCT 13: Ensemble en Maille de Cachemire Enfant (Kids) ---
        $p9 = Product::updateOrCreate(
            ['slug' => 'ensemble-en-maille-de-cachemire-enfant'],
            [
                'category_id' => $catEnsemblesKids->id,
                'name' => 'Ensemble en Maille de Cachemire Enfant',
                'description' => 'Un ensemble chaud et douillet tricoté en fil de cachemire mélangé hypoallergénique. Confortable et d\'un chic minimaliste.',
                'price' => 1500.00,
                'sale_price' => 1350.00,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p9->id, 'image_path' => 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        foreach ($kidsSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p9->id, 'size' => $size, 'color' => 'Gris Chiné'],
                [
                    'color_hex' => '#D3D3D3',
                    'stock' => 8 + ($idx * 2),
                    'sku' => 'EMC-GRIS-' . Str::slug($size),
                ]
            );
        }

        // --- PRODUCT 14: Robe de Cérémonie en Tulle Enfant (Kids) ---
        $p10 = Product::updateOrCreate(
            ['slug' => 'robe-de-ceremonie-en-tulle-enfant'],
            [
                'category_id' => $catKids->id,
                'name' => 'Robe de Cérémonie en Tulle Enfant',
                'description' => 'Robe féérique dotée de plusieurs couches de tulle délicat et d\'un bustier orné de petites fleurs brodées à la main.',
                'price' => 1600.00,
                'sale_price' => null,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => false,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p10->id, 'image_path' => 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=90'],
            ['is_primary' => true]
        );

        foreach ($kidsSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p10->id, 'size' => $size, 'color' => 'Rose Poudré'],
                [
                    'color_hex' => '#FFD1DC',
                    'stock' => 5 + ($idx * 2),
                    'sku' => 'RCE-ROSE-' . Str::slug($size),
                ]
            );
        }

        // --- PRODUCT 15: Manteau Croisé en Laine d'Agneau Enfant (Kids) ---
        $p_manteau_kid = Product::updateOrCreate(
            ['slug' => 'manteau-croise-en-laine-d-agneau-enfant'],
            [
                'category_id' => $catKids->id,
                'name' => 'Manteau Croisé en Laine d\'Agneau',
                'description' => 'Élégant petit manteau croisé d\'hiver en pure laine vierge d\'agneau d\'une douceur incomparable. Col tailleur classique w doublure en viscose satinée.',
                'price' => 1900.00,
                'sale_price' => null,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_manteau_kid->id, 'image_path' => 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        foreach ($kidsSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p_manteau_kid->id, 'size' => $size, 'color' => 'Gris Anthracite'],
                [
                    'color_hex' => '#36454F',
                    'stock' => 4 + ($idx * 2),
                    'sku' => 'MCL-GRIS-' . Str::slug($size),
                ]
            );
        }

        // --- PRODUCT 16: Ensemble en Lin Céleste Enfant (Kids) ---
        $p_ensemble_lin = Product::updateOrCreate(
            ['slug' => 'ensemble-en-lin-celeste-enfant'],
            [
                'category_id' => $catEnsemblesKids->id,
                'name' => 'Ensemble en Lin Céleste Enfant',
                'description' => 'Ensemble composé d\'une vareuse décontractée et d\'un pantalon élastique en pur lin délavé bleu céleste. Frais, respirant et d\'une élégance naturelle.',
                'price' => 1450.00,
                'sale_price' => null,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => true,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_ensemble_lin->id, 'image_path' => 'https://images.unsplash.com/photo-1471286174240-e51a896cb500?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        foreach ($kidsSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p_ensemble_lin->id, 'size' => $size, 'color' => 'Bleu Céleste'],
                [
                    'color_hex' => '#9BB7D4',
                    'stock' => 7 + ($idx * 2),
                    'sku' => 'ELC-BLEU-' . Str::slug($size),
                ]
            );
        }

        // --- PRODUCT 17: Mocassins Souples en Daim Enfant (Kids) ---
        $p_shoes = Product::updateOrCreate(
            ['slug' => 'mocassins-souples-en-daim-enfant'],
            [
                'category_id' => $catKidsAccs->id,
                'name' => 'Mocassins Souples en Daim Enfant',
                'description' => 'Mocassins d\'atelier en cuir de veau velours ultra souple. Semelles à picots confortables, idéales pour parfaire une tenue de fête avec raffinement.',
                'price' => 1200.00,
                'sale_price' => 1050.00,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => false,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_shoes->id, 'image_path' => 'https://images.unsplash.com/photo-1519242220831-09410926fbff?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        $kidsShoeSizes = ['24', '26', '28', '30'];
        foreach ($kidsShoeSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p_shoes->id, 'size' => $size, 'color' => 'Taupe Daim'],
                [
                    'color_hex' => '#8B8589',
                    'stock' => 5 + ($idx * 1),
                    'sku' => 'MSD-TAUPE-' . $size,
                ]
            );
        }

        // --- PRODUCT 18: Cape de Fête Doublée Satin Enfant (Kids) ---
        $p_cape = Product::updateOrCreate(
            ['slug' => 'cape-de-fete-doublee-satin-enfant'],
            [
                'category_id' => $catKids->id,
                'name' => 'Cape de Fête Doublée Satin',
                'description' => 'Magnifique cape de cérémonie en velours de coton lourd noir, entièrement doublée de satin soyeux ivoire. Fermoir bijou en métal doré antique à l\'encolure.',
                'price' => 1650.00,
                'sale_price' => null,
                'gender' => 'kids',
                'is_active' => true,
                'is_featured' => false,
            ]
        );

        ProductImage::updateOrCreate(
            ['product_id' => $p_cape->id, 'image_path' => 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=1000&auto=format&fit=crop'],
            ['is_primary' => true]
        );

        foreach ($kidsSizes as $idx => $size) {
            ProductVariant::updateOrCreate(
                ['product_id' => $p_cape->id, 'size' => $size, 'color' => 'Noir Impérial'],
                [
                    'color_hex' => '#0A0A0A',
                    'stock' => 3 + ($idx * 2),
                    'sku' => 'CFD-NOIR-' . Str::slug($size),
                ]
            );
        }
    }
}
