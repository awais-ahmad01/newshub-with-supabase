import { supabase } from '../../lib/supabaseClient';

export async function addReadingListData(articleData) {
  try {
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { 
        success: false, 
        message: "You must be logged in to save articles" 
      };
    }

    
    const articleToSave = {
      user_id: user.id,
      author: articleData.article.author || '',
      title: articleData.article.title,
      description: articleData.article.description || '',
      content: articleData.article.content || '',
      url: articleData.article.url || '',
      url_to_image: articleData.article.urlToImage || articleData.article.urltoimage || '',
      source: articleData.article.source?.name || articleData.article.source || '',
      published_at: articleData.article.publishedAt ? new Date(articleData.article.publishedAt).toISOString() : null
    };

    
    const { data, error } = await supabase
      .from('saved_articles')
      .insert([articleToSave])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return { 
        success: false, 
        message: error.message || "Failed to save article" 
      };
    }

    return { 
      success: true, 
      message: "Article saved successfully!", 
      data 
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      message: "An unexpected error occurred" 
    };
  }
}

export async function getUsersSavedArticles() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { 
        success: false, 
        data: [], 
        message: "You must be logged in to view your reading list" 
      };
    }

    const { data, error } = await supabase
      .from('saved_articles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return { 
        success: false, 
        data: [], 
        message: error.message 
      };
    }

    return { 
      success: true, 
      data: data || [],
      message: "Articles loaded successfully"
    };
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      data: [], 
      message: "An unexpected error occurred" 
    };
  }
}


export async function removeFromReadingList(articleId) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { 
        success: false, 
        message: "You must be logged in to remove articles" 
      };
    }

    const { error } = await supabase
      .from('saved_articles')
      .delete()
      .eq('id', articleId)
      .eq('user_id', user.id); 

    if (error) {
      console.error('Supabase error:', error);
      return { 
        success: false, 
        message: error.message 
      };
    }

    return { 
      success: true, 
      message: "Article removed successfully" 
    };
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      message: "An unexpected error occurred" 
    };
  }
}