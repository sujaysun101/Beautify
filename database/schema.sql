-- SkinIQ Database Schema for Supabase
-- Execute this SQL in your Supabase SQL editor to set up the required tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create skin_quiz_sessions table
CREATE TABLE IF NOT EXISTS skin_quiz_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'started' CHECK (status IN ('started', 'in_progress', 'completed', 'abandoned')),
    quiz_data JSONB DEFAULT '{}',
    current_step INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_results table for storing AI analysis results
CREATE TABLE IF NOT EXISTS quiz_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES skin_quiz_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    skin_analysis JSONB,
    product_recommendations JSONB,
    routine_plan JSONB,
    progress_tracking JSONB,
    analysis_version VARCHAR(50) DEFAULT 'v1.0',
    confidence_score DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_catalog table for storing product information
CREATE TABLE IF NOT EXISTS product_catalog (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT,
    key_ingredients TEXT[],
    skin_types TEXT[],
    concerns_addressed TEXT[],
    rating DECIMAL(2,1),
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table for tracking skin improvement over time
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES skin_quiz_sessions(id) ON DELETE CASCADE,
    progress_date DATE NOT NULL,
    progress_photos JSONB,
    user_notes TEXT,
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    concerns_improvement JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create image_storage table for tracking uploaded images
CREATE TABLE IF NOT EXISTS image_storage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES skin_quiz_sessions(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_type VARCHAR(50) NOT NULL, -- 'front', 'left', 'right', 'close_up', 'progress'
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    file_size INTEGER,
    image_quality_score DECIMAL(3,2),
    is_processed BOOLEAN DEFAULT false,
    processing_metadata JSONB
);

-- Create user_preferences table for storing user skincare preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    budget_range VARCHAR(50),
    time_commitment VARCHAR(50),
    product_preferences TEXT[],
    ingredient_allergies TEXT[],
    preferred_brands TEXT[],
    notification_preferences JSONB DEFAULT '{"email": true, "sms": false, "push": true}',
    privacy_settings JSONB DEFAULT '{"data_sharing": false, "marketing": false, "research": false}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recommendation_feedback table for tracking user feedback on recommendations
CREATE TABLE IF NOT EXISTS recommendation_feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES skin_quiz_sessions(id) ON DELETE CASCADE,
    product_id UUID REFERENCES product_catalog(id) ON DELETE CASCADE,
    feedback_type VARCHAR(50) NOT NULL, -- 'helpful', 'not_helpful', 'purchased', 'tried', 'reaction'
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skin_quiz_sessions_user_id ON skin_quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_skin_quiz_sessions_status ON skin_quiz_sessions(status);
CREATE INDEX IF NOT EXISTS idx_skin_quiz_sessions_created_at ON skin_quiz_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_session_id ON quiz_results(session_id);

CREATE INDEX IF NOT EXISTS idx_product_catalog_category ON product_catalog(category);
CREATE INDEX IF NOT EXISTS idx_product_catalog_brand ON product_catalog(brand);
CREATE INDEX IF NOT EXISTS idx_product_catalog_active ON product_catalog(is_active);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_date ON user_progress(progress_date);

CREATE INDEX IF NOT EXISTS idx_image_storage_user_id ON image_storage(user_id);
CREATE INDEX IF NOT EXISTS idx_image_storage_session_id ON image_storage(session_id);
CREATE INDEX IF NOT EXISTS idx_image_storage_type ON image_storage(image_type);

-- Create Row Level Security (RLS) policies
ALTER TABLE skin_quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_storage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for skin_quiz_sessions
CREATE POLICY "Users can view their own quiz sessions" ON skin_quiz_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz sessions" ON skin_quiz_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz sessions" ON skin_quiz_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for quiz_results
CREATE POLICY "Users can view their own quiz results" ON quiz_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results" ON quiz_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz results" ON quiz_results
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for image_storage
CREATE POLICY "Users can view their own images" ON image_storage
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own images" ON image_storage
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images" ON image_storage
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences" ON user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for recommendation_feedback
CREATE POLICY "Users can view their own feedback" ON recommendation_feedback
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback" ON recommendation_feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own feedback" ON recommendation_feedback
    FOR UPDATE USING (auth.uid() = user_id);

-- Product catalog is public read-only
CREATE POLICY "Anyone can view active products" ON product_catalog
    FOR SELECT USING (is_active = true);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_skin_quiz_sessions_updated_at BEFORE UPDATE ON skin_quiz_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_results_updated_at BEFORE UPDATE ON quiz_results
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_catalog_updated_at BEFORE UPDATE ON product_catalog
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample products into the catalog
INSERT INTO product_catalog (name, brand, category, price, description, key_ingredients, skin_types, concerns_addressed, rating) VALUES
('Gentle Foaming Cleanser', 'SkinCare Pro', 'cleanser', 24.00, 'Gentle formula suitable for sensitive skin while effectively removing impurities', ARRAY['Ceramides', 'Hyaluronic Acid', 'Niacinamide'], ARRAY['sensitive', 'normal', 'dry'], ARRAY['cleansing', 'hydration'], 4.5),
('Vitamin C + E Antioxidant Serum', 'GlowLab', 'serum', 45.00, 'Addresses aging concerns while being gentle enough for sensitive skin', ARRAY['L-Ascorbic Acid', 'Vitamin E', 'Ferulic Acid'], ARRAY['all'], ARRAY['aging', 'dullness', 'antioxidant-protection'], 4.7),
('Hydrating Daily Moisturizer', 'DermaCare', 'moisturizer', 32.00, 'Provides long-lasting hydration without clogging pores', ARRAY['Hyaluronic Acid', 'Ceramides', 'Peptides'], ARRAY['normal', 'dry', 'combination'], ARRAY['hydration', 'barrier-repair'], 4.6),
('Mineral Sunscreen SPF 50', 'SunShield', 'sunscreen', 28.00, 'Zinc oxide-based formula ideal for sensitive skin', ARRAY['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide'], ARRAY['sensitive', 'all'], ARRAY['sun-protection', 'sensitivity'], 4.4),
('Gentle Exfoliant', 'SkinRenewal', 'exfoliant', 35.00, 'Weekly treatment for improving skin texture and product absorption', ARRAY['Lactic Acid', 'Glycolic Acid', 'Aloe Vera'], ARRAY['normal', 'oily', 'combination'], ARRAY['texture', 'exfoliation'], 4.3),
('Retinol Night Treatment', 'Youth Restore', 'treatment', 55.00, 'Anti-aging retinol formula for evening use', ARRAY['Retinol', 'Hyaluronic Acid', 'Vitamin E'], ARRAY['normal', 'oily', 'combination'], ARRAY['aging', 'texture', 'acne'], 4.8),
('Niacinamide Serum', 'Clear Skin Co', 'serum', 18.00, 'Reduces enlarged pores and controls oil production', ARRAY['Niacinamide', 'Zinc', 'Hyaluronic Acid'], ARRAY['oily', 'combination'], ARRAY['pores', 'oil-control', 'acne'], 4.4),
('Hydrating Face Mask', 'Moisture Plus', 'mask', 22.00, 'Weekly hydrating treatment for dry and dehydrated skin', ARRAY['Hyaluronic Acid', 'Ceramides', 'Allantoin'], ARRAY['dry', 'normal'], ARRAY['hydration', 'soothing'], 4.2);

-- Create a view for easier querying of complete quiz data
CREATE OR REPLACE VIEW complete_quiz_sessions AS
SELECT 
    s.id,
    s.user_id,
    s.status,
    s.quiz_data,
    s.current_step,
    s.completed_at,
    s.created_at as session_created_at,
    s.updated_at as session_updated_at,
    r.skin_analysis,
    r.product_recommendations,
    r.routine_plan,
    r.progress_tracking,
    r.confidence_score,
    r.analysis_version
FROM skin_quiz_sessions s
LEFT JOIN quiz_results r ON s.id = r.session_id;

-- Comments explaining the schema
COMMENT ON TABLE skin_quiz_sessions IS 'Stores user quiz sessions with progress and collected data';
COMMENT ON TABLE quiz_results IS 'Stores AI analysis results and recommendations for each completed quiz';
COMMENT ON TABLE product_catalog IS 'Master catalog of all available skincare products';
COMMENT ON TABLE user_progress IS 'Tracks user progress photos and feedback over time';
COMMENT ON TABLE image_storage IS 'Stores metadata about uploaded skin images';
COMMENT ON TABLE user_preferences IS 'User preferences for products, budget, notifications etc';
COMMENT ON TABLE recommendation_feedback IS 'User feedback on product recommendations for improving AI';
