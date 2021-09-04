package com.knowledgebooks.nlp;


import com.knowledgebooks.nlp.util.Document;
import com.knowledgebooks.public_domain.Stemmer;

import java.util.ArrayList;
import java.util.List;

/**
 * General NLP utilities for extracting key phrases from input text also
 * generating short summaries of input text.
 *
 * <pre>
 *  Class to extract key-word based summarization from text. The algorithm is as follows:
 *
 *    1. find the most likely topic tags for the text
 *    2. locate words that contributed to forming these categories and
 *       set a weighting based on the relevance of the categories
 *    3. "smudge" out these weightings to surrounding words.
 *    4. using a threshold cutoff, locate summarization with high weightings
 * </pre>
 */

/**
 * Copyright Mark Watson 2008-2010. All Rights Reserved.
 * License: LGPL version 3 (http://www.gnu.org/licenses/lgpl-3.0.txt)
 */

public class KeyPhraseExtractionAndSummary {
  private PhraseList pl = new PhraseList();
  // (defun get-key-summarization (word-vector key-word-rankings &aux x y z v (ret '()))
  private Document document;

  /**
   * @param text
   */
  public KeyPhraseExtractionAndSummary(String text) {
    document = new Document(text);
    Stemmer stemmer = new Stemmer();

    List<String> stems = new ArrayList<String>(document.getNumWords());
    for (int i = 0, size = document.getNumWords(); i < size; i++) stems.add(stemmer.stemOneWord(document.getWord(i)));
    float[] weights = autoTagger.getWordImportanceWeights(stems);
    int[] start = document.startSentenceBoundary;
    document.getTokens();
    if (start == null) return;
    int[] end = document.endSentenceBoundary;
    int size = start.length;
    //System.out.println("KeyPhraseExtractionAndSummary.init:  number sentences in document="+size);
    float[] bb = new float[size];

    //
    // loop over sentences in the document for key word based summarization:
    //
    float bmax = 0f;
    for (int i = 0; i < size; i++) {
      for (int j = start[i]; j <= end[i]; j++) {
        bb[i] += weights[j];
      }
      if (end[i] > start[i]) bb[i] /= (end[i] - start[i]);
      if ((end[i] - start[i]) < 50) bb[i] *= 0.65f; // penalize short segments
      if ((end[i] - start[i]) < 25) bb[i] *= 0.45f; // penalize very short segments
      if (bmax < bb[i]) bmax = bb[i];
    }
    // store higher ranked sentences in the phrase list:
    for (int i = 0; i < size; i++) {
      if (bb[i] > 0.75f * bmax) {
        String s = document.getSentence(i);
        if (s.indexOf("without written permission") > -1) bb[i] *= 0.25f;
        if (s.indexOf("from the Associated Press") > -1) bb[i] *= 0.25f;
        if (s.indexOf("Copyright") > -1) bb[i] *= 0.8f;
        if (s.startsWith("Copyright")) bb[i] *= 0.3f;
        if (bb[i] > 0.6f * bmax) pl.addPhrase(s, bb[i]);
      }
    }
    // check to see if there are no summarization - if not, use other means to rank sentences:
    if (pl.getNumPhrases() == 0) {
      // no key summarization generated by hot word counts - use second method
      if (size > 0) {
        for (int i = 0; i < size; i++) {
          String s = document.getSentence(i);
          if (s == null || s.length() == 0) continue;
          float charRatio = 0;
          int slen = s.length();
          for (int j = 0; j < slen; j++) {
            char ch = s.charAt(j);
            if (Character.isLetterOrDigit(ch)) charRatio += 1;
            else charRatio -= 1;
          }
          float score = charRatio * 0.1f;
          if (s.toLowerCase().indexOf("copyright") > -1) score -= 3;
          if (s.toLowerCase().indexOf("The information contained in") > -1) score -= 7;
          if (slen < 40) score -= 3;
          if (slen > 200) score -= 2;
          char startChar = s.charAt(0);
          if (Character.isLetterOrDigit(startChar) == false) score -= 4;
          if (Character.isLowerCase(startChar)) score -= 5;
          if (s.startsWith("By ")) score -= 1;
          if (score > 5) pl.addPhrase(s, (score / 25000));  // FOR DEBUG: bias score so I know this option used
        }
      }
    }
    // sort the phrase list, highest relevancy first:
    pl.sortPhrases();
  }

  private String[] keyWords = null;

  public String[] getKeyWords() {
    return keyWords;
  }

  public int getNumPhrases() {
    return pl.getNumPhrases();
  }

  public float getScore(int index) {
    return pl.getScore(index);
  }

  public String getPhrase(int index) {
    return pl.getPhrase(index);
  }

  public PhraseList getAllPhrases() {
    return pl;
  }

  public String getSummary() {
    //System.out.println("\n\n  GETTING SUMMARY:");
    //for (int i=0; i<pl.size(); i++) {
    //    System.out.println("   score:" + pl.getScore(i)+", phrase: "+pl.getPhrase(i));
    //}
    String ret = "";
    //System.out.println("GETTING SUMMARY: pl.size()=" + pl.size());
    if (pl.size() == 1) ret = pl.getPhrase(0);
      /*else if (pl.getScore(0) > (2 * pl.getScore(1))) ret = pl.getPhrase(0);
else if (pl.getPhrase(0).length() > 80)  ret = pl.getPhrase(0);*/
    else ret = pl.getPhrase(0) + "  " + pl.getPhrase(1);
    ret = ret.trim();
    return ret;
  }

  //private Document document;
  private AutoTagger autoTagger = new AutoTagger();
  // test:

  public static void main(String[] args) {
    //String s = "President Bush went to Mexico to buy oil. The stock market, especially oil futures fell sharply. He danced while there.";
    String s = "Sales of 10 cotton cloth and raw silk cocoons  are down in England and France due to competition from India. Cotton is easy to wash. President Bush, wearing a Strouds shirt, and Congress are concerned about US cotton and riso and Riso sales. Airline traffic is down this year.";
    KeyPhraseExtractionAndSummary e = new KeyPhraseExtractionAndSummary(s);
    int num = e.getNumPhrases();
    for (int i = 0; i < num; i++) {
      System.out.println("" + e.getScore(i) + " : " + e.getPhrase(i));
    }
    System.out.println("\nSummary:\n" + e.getSummary());
  }
}

